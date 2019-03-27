const express = require("express");
const postRouter = require("./posts/posts-router.js");
const userRouter = require("./users/users-router.js");

const server = express();
const cors = require("cors");

server.use(express.json());
server.use(cors());

server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send("sanity");
});

module.exports = server;
