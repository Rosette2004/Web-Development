const express = require("express");
const app = express();

app.use(express.json());

let posts = [];
let comments = [];

// CREATE post
app.post("/posts", (req, res) => {
  const post = {
    id: Date.now().toString(),
    text: req.body.text,
  };
  posts.push(post);
  res.json(post);
});

// GET all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// UPDATE post
app.put("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).send("Post not found");

  post.text = req.body.text;
  res.json(post);
});

// DELETE post
app.delete("/posts/:id", (req, res) => {
  posts = posts.filter((p) => p.id !== req.params.id);
  res.send("Post deleted");
});

// ADD comment
app.post("/posts/:id/comments", (req, res) => {
  const comment = {
    id: Date.now().toString(),
    postId: req.params.id,
    text: req.body.text,
  };
  comments.push(comment);
  res.json(comment);
});

// GET comments
app.get("/posts/:id/comments", (req, res) => {
  const postComments = comments.filter((c) => c.postId === req.params.id);
  res.json(postComments);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
