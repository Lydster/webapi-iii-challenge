const express = require("express");

const Users = require("./userDb.js");

const router = express.Router();

//GET ALL

router.get("/", async (req, res) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrrieveing bubs" });
  }
});

//GET ONE

router.get("/:id", async (req, res) => {
  try {
    const user = await Users.getById(req.params.id);
    console.log(user);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified id does not exist." });
    }
  } catch (error) {
    res.status(500).json({
      error: "The user information could not be retrieved."
    });
  }
});

//ADD ONE

router.post("/", async (req, res) => {
  try {
    if (req.body) {
      await Users.insert(req.body);
      res.status(201).json(req.body);
    } else {
      res.status(400).json({
        errorMessage: "Please provide a user."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the new user."
    });
  }
});

//UPDATE

router.put("/:id", async (req, res) => {
  try {
    const user = await Users.getById(req.params.id);
    const changes = await req.body.name;
    console.log(user);
    console.log(changes);
    if (!changes) {
      res
        .status(400)
        .json({ errorMessage: "Please provide a name to update." });
    } else {
      Users.update(req.params.id, changes);
      res.status(200).json(user);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The user information could not up updated." });
  }
});

module.exports = router;
