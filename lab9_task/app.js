require("dotenv").config(); // ← must be the first line

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
const courseRoutes = require("./routes/courses");
app.use("/courses", courseRoutes);

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
