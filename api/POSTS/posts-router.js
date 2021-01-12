const express = require("express");
const Posts = require("../db-helpers");
const router = express.Router();

router.get("/", (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Posts.findById(id)
    .then(post => {
      res.status(200).json(post);
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

//   Posts.update()
//     .then(postUpdate => {
//       res.status(202).json(postUpdate);
//     })
//     .catch(error => {
//       res
//         .status(500)
//         .json({ error: "The post information could not be modified." });
//     });
// });

module.exports = router;
