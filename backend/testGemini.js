const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function test() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say hello in Ukrainian and English",
    });

    console.log("✅ API Key works!");
    console.log("Response:", response.text);
  } catch (error) {
    console.error("❌ API Key error:", error.message);
  }
}

test();
