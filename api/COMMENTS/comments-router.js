const express = require("express");
const Comments = require("../db-helpers");
const router = express.Router();

router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  Comments.findPostComments(id)
    .then(post => {
      if (post && post.length > 0) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "id not found" });
    });
});

module.exports = router;
