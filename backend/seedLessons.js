const mongoose = require("mongoose");
const Lesson = require("./models/Lesson");
require("dotenv").config();

const sampleLessons = [
  {
    id: "A1-lesson-1",
    level: "A1",
    title: "Привітання та знайомство",
    titleEn: "Greetings and Introductions",
    content: `
# Greetings and Introductions

In this lesson, you'll learn basic English greetings and how to introduce yourself.

## Common Greetings:
- **Hello** - Привіт (formal and informal)
- **Hi** - Привіт (informal)
- **Good morning** - Доброго ранку
- **Good afternoon** - Доброго дня
- **Good evening** - Доброго вечора
- **Goodbye** - До побачення
- **Bye** - Бувай

## Introducing Yourself:
- **My name is...** - Мене звати...
- **I am from Ukraine** - Я з України
- **Nice to meet you** - Приємно познайомитися
- **How are you?** - Як справи?
- **I'm fine, thank you** - Я добре, дякую

## Example Dialogue:
**Person A:** Hello! My name is Anna. What's your name?
**Person B:** Hi Anna! I'm Oleg. Nice to meet you.
**Person A:** Nice to meet you too, Oleg. How are you?
**Person B:** I'm fine, thank you. And you?
**Person A:** I'm great! Where are you from?
**Person B:** I'm from Kyiv, Ukraine.
    `,
    vocabulary: [
      { en: "Hello", ua: "Привіт", example: "Hello! How are you?" },
      {
        en: "Goodbye",
        ua: "До побачення",
        example: "Goodbye! See you tomorrow.",
      },
      { en: "My name is", ua: "Мене звати", example: "My name is Anna." },
      {
        en: "Nice to meet you",
        ua: "Приємно познайомитися",
        example: "Nice to meet you!",
      },
      { en: "How are you?", ua: "Як справи?", example: "Hello! How are you?" },
      { en: "I am fine", ua: "Я добре", example: "I am fine, thank you." },
      { en: "Thank you", ua: "Дякую", example: "Thank you very much!" },
      {
        en: "Where are you from?",
        ua: "Звідки ти?",
        example: "Where are you from?",
      },
    ],
    quiz: [
      {
        type: "multiple-choice",
        question: 'Як сказати "Привіт" англійською?',
        options: ["Hello", "Goodbye", "Thank you", "Please"],
        correct: 0,
      },
      {
        type: "multiple-choice",
        question: 'Що означає "Nice to meet you"?',
        options: [
          "До побачення",
          "Приємно познайомитися",
          "Як справи?",
          "Дякую",
        ],
        correct: 1,
      },
      {
        type: "translation",
        question: 'Перекладіть: "Мене звати Олег"',
        options: [
          "My name is Oleg",
          "I am Oleg",
          "Hello Oleg",
          "Oleg is my name",
        ],
        correct: 0,
      },
      {
        type: "fill-blank",
        question: 'Заповніть пропуск: "How ___ you?"',
        correctAnswer: "are",
      },
      {
        type: "multiple-choice",
        question: 'Яка правильна відповідь на "How are you?"',
        options: [
          "I am fine, thank you",
          "My name is Anna",
          "Goodbye",
          "Hello",
        ],
        correct: 0,
      },
      {
        type: "translation",
        question: 'Перекладіть: "Я з України"',
        options: [
          "I am from Ukraine",
          "I live in Ukraine",
          "Ukraine is my home",
          "I like Ukraine",
        ],
        correct: 0,
      },
      {
        type: "fill-blank",
        question: 'Заповніть: "Good ___" (ранок)',
        correctAnswer: "morning",
      },
      {
        type: "multiple-choice",
        question: 'Що означає "Goodbye"?',
        options: ["Привіт", "До побачення", "Дякую", "Будь ласка"],
        correct: 1,
      },
    ],
    order: 1,
  },
  {
    id: "A1-lesson-2",
    level: "A1",
    title: "Числа та вік",
    titleEn: "Numbers and Age",
    content: `
# Numbers and Age

Learn how to count in English and talk about your age.

## Numbers 0-20:
- **0** - zero (нуль)
- **1** - one (один)
- **2** - two (два)
- **3** - three (три)
- **4** - four (чотири)
- **5** - five (п'ять)
- **6** - six (шість)
- **7** - seven (сім)
- **8** - eight (вісім)
- **9** - nine (дев'ять)
- **10** - ten (десять)
- **11** - eleven (одинадцять)
- **12** - twelve (дванадцять)
- **13** - thirteen (тринадцять)
- **14** - fourteen (чотирнадцять)
- **15** - fifteen (п'ятнадцять)
- **16** - sixteen (шістнадцять)
- **17** - seventeen (сімнадцять)
- **18** - eighteen (вісімнадцять)
- **19** - nineteen (дев'ятнадцять)
- **20** - twenty (двадцять)

## Talking About Age:
- **How old are you?** - Скільки тобі років?
- **I am ... years old** - Мені ... років
- **He is 25 years old** - Йому 25 років
- **She is 30** - Їй 30

## Example Sentences:
- I am twenty years old. (Мені двадцять років)
- My brother is fifteen. (Моєму брату п'ятнадцять)
- How old is your sister? (Скільки років твоїй сестрі?)
- She is twelve years old. (Їй дванадцять років)

## Practice:
Remember, we say "I am X years old" or just "I am X" - both are correct!
    `,
    vocabulary: [
      { en: "One", ua: "Один", example: "I have one brother." },
      { en: "Two", ua: "Два", example: "I have two sisters." },
      { en: "Five", ua: "П'ять", example: "I am five years old." },
      { en: "Ten", ua: "Десять", example: "I have ten fingers." },
      {
        en: "Fifteen",
        ua: "П'ятнадцять",
        example: "She is fifteen years old.",
      },
      { en: "Twenty", ua: "Двадцять", example: "He is twenty." },
      { en: "How old", ua: "Скільки років", example: "How old are you?" },
      { en: "Years old", ua: "Років", example: "I am 18 years old." },
    ],
    quiz: [
      {
        type: "multiple-choice",
        question: 'Як сказати "5" англійською?',
        options: ["Five", "Four", "Six", "Seven"],
        correct: 0,
      },
      {
        type: "translation",
        question: 'Перекладіть: "Мені 20 років"',
        options: [
          "I am 20 years old",
          "I have 20 years",
          "My age is 20",
          "I am 20 age",
        ],
        correct: 0,
      },
      {
        type: "multiple-choice",
        question: 'Що означає "How old are you?"',
        options: [
          "Як тебе звати?",
          "Скільки тобі років?",
          "Звідки ти?",
          "Як справи?",
        ],
        correct: 1,
      },
      {
        type: "fill-blank",
        question: 'Заповніть: "I am ___ years old" (15)',
        correctAnswer: "fifteen",
      },
      {
        type: "multiple-choice",
        question: 'Яке число йде після "nine"?',
        options: ["Eight", "Ten", "Eleven", "Twelve"],
        correct: 1,
      },
      {
        type: "translation",
        question: 'Як запитати "Скільки тобі років?" англійською?',
        options: [
          "How old are you?",
          "How are you?",
          "What is your age?",
          "How many years?",
        ],
        correct: 0,
      },
      {
        type: "fill-blank",
        question: 'Заповніть: "She is ___ years old" (12)',
        correctAnswer: "twelve",
      },
      {
        type: "multiple-choice",
        question: 'Як правильно: "I am 20 ___"',
        options: ["years", "year old", "years old", "year"],
        correct: 2,
      },
    ],
    order: 2,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing A1 lessons
    await Lesson.deleteMany({ level: "A1" });
    console.log("🗑️  Cleared existing A1 lessons");

    // Insert sample lessons
    await Lesson.insertMany(sampleLessons);
    console.log("✅ Added 2 A1 lessons");

    console.log("🎉 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
