const express = require("express");
const Posts = require("../db-helpers");
const router = express.Router();

router.get("/", async (req, res) => {
  const post = await Posts.find();
  if (post) {
    try {
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Posts.findById(id)
    .then(post => {
      if (post.length) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          errorMessage: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

router.post("/", async (req, res) => {
  const newPost = req.body;
  if (!newPost.title || !newPost.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    try {
      const newlyMadePost = await Posts.insert(newPost);
      res.status(201).json(newlyMadePost);
    } catch (error) {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    }
  }
});

router.put("/:id", async (req, res) => {
  const editPost = req.body;
  const id = req.params.id;

  if (!editPost.title || !editPost.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    try {
      const newEditedPost = await Posts.update(id, editPost);
      if (!newEditedPost) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(newEditedPost);
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deleted = await Posts.remove(id);

  if (deleted) {
    res.status(200).json(deleted);
  } else {
    try {
      res.status(404).json({ message: "The adopter could not be found" });
    } catch (error) {
      res.status(500).json({ errorMessage: "Error removing the adopter" });
    }
  }
});

module.exports = router;
