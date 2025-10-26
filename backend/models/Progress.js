const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    // For MVP, we'll use a single user with id "default"
    userId: {
      type: String,
      default: "default",
    },
    currentLevel: {
      type: String,
      default: "A1",
    },
    completedLessons: [
      {
        lessonId: String,
        score: Number,
        totalQuestions: Number,
        completedAt: Date,
      },
    ],
    totalXP: {
      type: Number,
      default: 0,
    },
    streak: {
      type: Number,
      default: 0,
    },
    highestStreak: {
      type: Number,
      default: 0,
    },
    lastLoginDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Progress", progressSchema);
