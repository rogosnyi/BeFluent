const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Progress = require("../models/Progress");

// Check if username exists
router.get("/check/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username.toLowerCase() });

    res.json({ exists: !!user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error checking user", error: error.message });
  }
});

// Create new user
router.post("/create", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || username.trim().length === 0) {
      return res.status(400).json({ message: "Username is required" });
    }

    if (username.length < 3) {
      return res
        .status(400)
        .json({ message: "Username must be at least 3 characters" });
    }

    // Check if username already exists
    const existingUser = await User.findOne({
      username: username.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Create new user
    const user = new User({ username: username.toLowerCase() });
    await user.save();

    // Create initial progress for the user
    const progress = new Progress({
      userId: username.toLowerCase(),
      currentLevel: "A1",
      totalXP: 0,
      streak: 0,
      highestStreak: 0,
    });
    await progress.save();

    res.status(201).json({
      success: true,
      user: { username: user.username },
      message: "User created successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating user", error: error.message });
  }
});

// Login (just verify user exists)
router.post("/login", async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username: username.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      user: { username: user.username },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

module.exports = router;
