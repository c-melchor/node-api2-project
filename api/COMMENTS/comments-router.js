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
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } else {
    res.status(500).json({ errorMessage: "id not found" });
  }
});

module.exports = router;
