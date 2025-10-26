const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    level: {
      type: String,
      required: true,
      enum: ["A1", "A2", "B1", "B2", "C1"],
    },
    title: {
      type: String,
      required: true,
    },
    titleEn: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    vocabulary: [
      {
        en: String,
        ua: String,
        example: String,
      },
    ],
    quiz: [
      {
        type: {
          type: String,
          enum: ["multiple-choice", "translation", "fill-blank"],
        },
        question: String,
        options: [String],
        correct: mongoose.Schema.Types.Mixed, // Can be number or string
        correctAnswer: String, // For fill-blank questions
      },
    ],
    order: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lesson", lessonSchema);
