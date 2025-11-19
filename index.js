import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { extractJson } from "./utils/extractJson.js";
import { generateFallbackQuestions } from "./services/aiService.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const MODELS = [
  "google/gemini-2.0-flash-exp:free",
  "qwen/qwen-2.5-72b-instruct:free",
  "mistralai/mistral-7b-instruct:free"
];

app.get("/", (req, res) => {
  res.json({
    message: "AI Quiz Generator – Node.js Version",
    ai_enabled: Boolean(OPENROUTER_API_KEY),
    timestamp: new Date()
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    ai: OPENROUTER_API_KEY ? "enabled" : "disabled",
    timestamp: new Date()
  });
});

app.post("/api/generate-quiz", async (req, res) => {
  try {
    const { topic, question_count = 10 } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    // No API key → fallback questions
    if (!OPENROUTER_API_KEY) {
      const questions = generateFallbackQuestions(topic, question_count);
      return res.json({
        success: true,
        source: "fallback",
        questions
      });
    }

    // AI request
    const model = MODELS[Math.floor(Math.random() * MODELS.length)];

    const systemPrompt = `
      Create ${question_count} MCQs about "${topic}".
      Return valid JSON:
      {
        "questions": [
          {
            "question": "...",
            "options": ["A","B","C","D"],
            "correct_answer": 0,
            "explanation": "..."
          }
        ]
      }
    `;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Generate ${question_count} questions.` }
        ],
        max_tokens: 3000,
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const content = response.data.choices[0].message.content;
    const jsonData = extractJson(content);

    if (!jsonData) {
      throw new Error("Invalid JSON from AI");
    }

    const data = JSON.parse(jsonData);

    const formatted = data.questions.map((q, i) => ({
      question: q.question,
      answers: q.options.map((opt, idx) => ({
        text: opt,
        correct: idx === q.correct_answer
      })),
      explanation: q.explanation
    }));

    res.json({
      success: true,
      source: "ai",
      topic,
      questions: formatted
    });
  } catch (err) {
    console.error(err);
    res.json({
      success: true,
      source: "fallback",
      questions: generateFallbackQuestions(req.body.topic, req.body.question_count)
    });
  }
});

const PORT = process.env.PORT || 5000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
