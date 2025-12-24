const express = require("express");
const router = express.Router();
const Course = require("../models/course");

// CREATE
router.post("/", async (req, res) => {
  const course = await Course.create(req.body);
  res.json(course);
});

// READ ALL
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// UPDATE
router.put("/:id", async (req, res) => {
  await Course.updateOne({ _id: req.params.id }, req.body);
  res.send("Course updated");
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Course.deleteOne({ _id: req.params.id });
  res.send("Course deleted");
});

module.exports = router;
