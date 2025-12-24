const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  instructor: String,
  price: Number,
  category: String,
  enrolledStudents: { type: Number, default: 0 },
});

module.exports = mongoose.model("Course", courseSchema);
