const express = require("express");
const Comments = require("../db-helpers");
const router = express.Router();

router.get("/:id/comments", async (req, res) => {
  const id = req.params.id;
  const commentsFound = await Comments.findCommentById(id);

  if (commentsFound && commentsFound.length > 0) {
    try {
      res.status(200).json(commentsFound);
    } catch (error) {
      res.status(404).json({
        errorMessage: "The post with the specified ID does not exist."
      });
    }
  } else {
    res.status(500).json({
      errorMessage: "The comments information could not be retrieved."
    });
  }
});

router.post("/:id/comments", async (req, res) => {
  const id = req.params.id;
  const comment = req.body;

  if (!comment.text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
    // } else if (id !== res.id) {
  } else if (!id) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else {
    try {
      const postComment = await Comments.insertComment({
        post_id: id,
        text: comment.text
      });

      const commentPosted = await Comments.findCommentById(postComment.id[0]);
      console.log(commentPosted);
      console.log(postComment);
      res.status(201).json(postComment);
    } catch (error) {
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    }
  }
});

module.exports = router;
