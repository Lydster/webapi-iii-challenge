const express = require("express");

const Posts = require("./postDb.js");

const router = express.Router();

const { CapsPost, CapsPut } = require("./customMiddlewarePost");

//GET ALL

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.get();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving posts" });
  }
});

//GET ONE

router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.getById(req.params.id);
    console.log(post);
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified id does not exist." });
    }
  } catch (error) {
    res.status(500).json({
      error: "The post information could not be retrieved."
    });
  }
});

//ADD ONE

router.post("/", CapsPost, async (req, res) => {
  try {
    if (req.body) {
      await Posts.insert(req.body);
      res.status(201).json(req.body);
    } else {
      res.status(400).json({
        errorMessage: "Please provide a post."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the new post."
    });
  }
});

//UPDATE

router.put("/:id", CapsPut, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await Posts.update(id, req.body);

    if (!updatedPost) {
      res
        .status(404)
        .json({ message: "The post you want to update does not exist." });
    } else {
      res.status(200).json({ message: "update successful" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error while updating that post" });
  }
});

module.exports = router;
