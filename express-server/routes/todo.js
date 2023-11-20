const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");
const privateKey = process.env.JWT_PRIVATE_KEY;


router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
      next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Authorization header missing." });
  }
});


router.post("/", async function (req, res) {
  const todo = new Todo({
    title: req.body.title,
    content: req.body.content,
    author: req.payload.id,
    dateCreated: req.body.dateCreated,
    complete: req.body.complete,
    dateCompleted: req.body.dateCompleted
  });
  await todo
    .save()
    .then((savedPost) => {
      return res.status(201).json({
        id: savedPost._id,
        title: savedPost.title,
        content: savedPost.content,
        author: savedPost.author,
        dateCreated: savedPost.dateCreated,
        complete: savedPost.complete,
        dateCompleted: savedPost.dateCompleted
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.get("/", async function (req, res) {
  const todos = await Todo.find().where("author").equals(req.payload.id).exec();
  return res.status(200).json({ todos: todos });
});

router.put('/:id', async function (req, res) {
  const todos = await Todo.findByIdAndUpdate(req.params.id, {
      complete: req.body.complete,
      dateCompleted: req.body.dateCompleted
  }).exec();
  return res.status(200).json({ todos: todos });
});

router.delete("/:id", async function (req, res) {
  const todos = await Todo.findByIdAndDelete(req.params.id).exec();
  return res.status(200).json({ todos: todos });
});
  

module.exports = router;