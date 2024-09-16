const express = require("express");
const postsRouter = require("./POSTS/posts-router");
const commentsRouter = require("./COMMENTS/comments-router");
const server = express();

server.use(express.json());
server.use("/api/posts", postsRouter);
server.use("/api/posts", commentsRouter);

server.get("/", (req, res) => {
  res
    .status(200)
    .json({
      name: "Christina's Deployment",
      enviornment: process.env.NODE_ENV
    });
});
module.exports = server;
