const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");

// Initialize Gemini with new SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// AI Chat endpoint
router.post("/", async (req, res) => {
  try {
    const { message, lessonContext, mistakes } = req.body;

    // Build detailed mistakes context
    let mistakesContext = "";
    if (mistakes && mistakes.length > 0) {
      mistakesContext = "\n\nПомилки студента:\n";
      mistakes.forEach((mistake, index) => {
        mistakesContext += `${index + 1}. Питання: "${mistake.question}"\n`;
        mistakesContext += `   Відповідь студента: "${mistake.userAnswer}"\n`;
        mistakesContext += `   Правильна відповідь: "${mistake.correctAnswer}"\n\n`;
      });
    }

    // Build the prompt for Gemini
    const systemPrompt = `Ти - українськомовний репетитор англійської мови. Твоя мета - допомогти українцям вивчати англійську.

Студент щойно завершив урок на тему: ${lessonContext || "English basics"}.
${mistakesContext}

ВАЖЛИВІ ПРАВИЛА:
1. Завжди відповідай УКРАЇНСЬКОЮ мовою для пояснень
2. Використовуй англійські слова/фрази ТІЛЬКИ як приклади (в лапках)
3. Якщо студент пише українською - відповідай українською
4. Якщо студент пише англійською - виправляй помилки, але пояснюй українською
5. Заохочуй студента практикувати англійську, але пояснення завжди українською
6. Будь терплячим, підтримуючим та позитивним. Але і не займайся надмірною похвалою на пустому місці.
7. Відповіді мають бути короткими (2-4 речення), але якщо студент просить пояснення з конкретики - надавай його повністю.
8. Звертай увагу на помилки студента вище і допомагай з ними

Твоя мета як репетитора - допомогти студенту засвоїти пройдений урок, та пояснити помилки якщо вони є.

Повідомлення студента: ${message}`;

    // Generate content with new SDK
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: systemPrompt,
    });

    res.json({ message: response.text });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({
      message: "Sorry, I encountered an error. Please try again.",
      error: error.message,
    });
  }
});

module.exports = router;
