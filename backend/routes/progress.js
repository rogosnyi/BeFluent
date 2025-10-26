const express = require("express");
const router = express.Router();
const Progress = require("../models/Progress");

// Get user progress
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    let progress = await Progress.findOne({ userId });

    // If no progress exists, create initial progress
    if (!progress) {
      progress = new Progress({ userId });
      await progress.save();
    }

    res.json(progress);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching progress", error: error.message });
  }
});

// Update progress after completing a lesson
router.post("/complete-lesson", async (req, res) => {
  try {
    const { userId, lessonId, score, totalQuestions } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    let progress = await Progress.findOne({ userId });

    if (!progress) {
      progress = new Progress({ userId });
    }

    // Add completed lesson
    progress.completedLessons.push({
      lessonId,
      score,
      totalQuestions,
      completedAt: new Date(),
    });

    // Add XP (10 points per correct answer)
    progress.totalXP += score * 10;

    // Update streak logic
    const today = new Date();
    const lastLogin = new Date(progress.lastLoginDate);
    const daysDiff = Math.floor((today - lastLogin) / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      // Same day - no change to streak
    } else if (daysDiff === 1) {
      // Consecutive day - increase streak
      progress.streak += 1;
    } else {
      // Streak broken - reset to 1
      progress.streak = 1;
    }

    // Update highest streak
    if (progress.streak > progress.highestStreak) {
      progress.highestStreak = progress.streak;
    }

    // Update last login date
    progress.lastLoginDate = today;

    await progress.save();
    res.json(progress);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating progress", error: error.message });
  }
});

// Update current level
router.patch("/level", async (req, res) => {
  try {
    const { userId, level } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    let progress = await Progress.findOne({ userId });

    if (!progress) {
      progress = new Progress({ userId });
    }

    progress.currentLevel = level;
    await progress.save();

    res.json(progress);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating level", error: error.message });
  }
});

module.exports = router;
