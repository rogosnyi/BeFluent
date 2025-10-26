const express = require("express");
const router = express.Router();
const Lesson = require("../models/Lesson");

// Get all lessons for a specific level
router.get("/level/:level", async (req, res) => {
  try {
    const { level } = req.params;
    const lessons = await Lesson.find({ level }).sort({ order: 1 });
    res.json(lessons);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching lessons", error: error.message });
  }
});

// Get single lesson by ID
router.get("/:id", async (req, res) => {
  try {
    const lesson = await Lesson.findOne({ id: req.params.id });
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.json(lesson);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching lesson", error: error.message });
  }
});

// Create new lesson (for adding lessons to database)
router.post("/", async (req, res) => {
  try {
    const lesson = new Lesson(req.body);
    await lesson.save();
    res.status(201).json(lesson);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating lesson", error: error.message });
  }
});

module.exports = router;
