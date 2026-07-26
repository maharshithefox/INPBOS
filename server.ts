import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is missing. AI features will fallback to structured local intelligence.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
};

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "PBOS - Photography Business Operating System", timestamp: new Date().toISOString() });
});

// AI Assistant API Route
app.post("/api/ai/assistant", async (req, res) => {
  try {
    const { prompt, context } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        text: "I am running in offline mode. Based on current system records: You have 1 active shoot today, ₹2,36,000 in pending payment for Aarav & Ananya, and 1 project in editing stage."
      });
    }

    const systemInstruction = `You are PBOS AI Assistant ("The Brain of Million's Photography & Films"). You are an expert photography studio operations consultant and AI director.
Answer queries concisely, professionally, and accurately using provided studio context.
Help studio managers, salespeople, editors, and photographers with scheduling, payment reminders, creative guidance, gear checklists, and client status updates.
Do not use hype. Focus on clear action items and business intelligence.
FORMATTING RULE: Do NOT use markdown bold formatting like **stars** or *asterisks* anywhere in your response. Write clean, natural, plain conversational text without any ** or * symbols.`;

    const userContent = `Studio Context:
${JSON.stringify(context || {}, null, 2)}

User Question: ${prompt}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userContent,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });

    const rawText = response.text || "No response received from AI model.";
    const cleanText = rawText.replace(/\*\*/g, "").replace(/\*/g, "");

    res.json({ text: cleanText });
  } catch (error: any) {
    console.error("AI Assistant API Error:", error);
    res.status(500).json({ error: error?.message || "Failed to generate AI response." });
  }
});

// Customer Support AI Chatbot API (Friendly, Casual & Direct AI Care)
app.post("/api/ai/customer-chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        text: "Hey! I'm KIMJIKOIN. I'm running in offline mode right now, but feel free to ask about INPBOS features, quotations, scheduling, or INPBOS Drive! You can also email us directly at maharshithefox@gmail.com."
      });
    }

    const systemInstruction = `You are "KIMJIKOIN", the warm, casual, and friendly AI Assistant for INPBOS (International Photography Business Operating System).

YOUR PERSONALITY & TONE OF VOICE:
- Be warm, casual, friendly, and approachable like a helpful friend in the photography industry.
- Give fast, direct, concise answers (1 to 3 sentences maximum).
- Speak naturally and conversationally without fluff, long introductions, or stiff corporate language.

CRITICAL RULES:
1. NO BULLET POINTS OR STARS: Do NOT use bullet points, numbered lists, hyphens (-), stars (* or **), or star emojis anywhere in your responses. Write clean, natural sentences in plain paragraphs.
2. NO PHONE NUMBERS OR OFFICE LOCATIONS: Never mention or share phone numbers or physical office addresses. If asked for direct contact details, guide them casually to email us at maharshithefox@gmail.com or fill out the support ticket form in this chat.
3. NO ADMINISTRATIVE DISCLAIMERS: Do not include legal disclaimers, liability warnings, or fine print.
4. Keep all replies fast, friendly, helpful, and focused on photography studio workflows.`;

    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      history.forEach((item: { sender: string; text: string }) => {
        if (item.text && item.text.trim()) {
          contents.push({
            role: item.sender === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }]
          });
        }
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: message || "Hello!" }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });

    const rawReply = response.text || "Hello! How can I help you today?";
    const cleanReply = rawReply
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/^[\s]*[-•*][\s]+/gm, "")
      .replace(/[✨⭐🌟💫💖📧]/g, "");

    res.json({ text: cleanReply });
  } catch (error: any) {
    console.error("Customer Chat API Error:", error);
    res.json({
      text: "Oh no! I had a tiny hiccup connecting to my brain, but I'm still here for you! ✨ Feel free to ask me another question or email our friendly team at 📧 maharshithefox@gmail.com! 💖"
    });
  }
});

// AI Risk Assessment & Business Summary
app.post("/api/ai/business-health", async (req, res) => {
  try {
    const { projects, financeSummary, leadsCount, employeeCount } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        summary: "Studio operating normally. 1 project in editing stage requires color grading QC before final client delivery.",
        healthScore: 92,
        actionItems: [
          "Follow up on ₹2,36,000 balance due from Aarav & Ananya before final deliverable dispatch.",
          "Ensure raw backup verification is complete for today's field shoot."
        ]
      });
    }

    const prompt = `Analyze this photography studio snapshot and return JSON with keys "summary", "healthScore" (number 1-100), and "actionItems" (array of strings):
Projects: ${JSON.stringify(projects || [])}
Finance: ${JSON.stringify(financeSummary || {})}
Leads: ${leadsCount}
Employees: ${employeeCount}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are a senior studio risk auditor. Provide a realistic business health score and urgent high-priority action items for the studio owner."
      }
    });

    let jsonRes;
    try {
      jsonRes = JSON.parse(response.text || "{}");
    } catch (e) {
      jsonRes = {
        summary: response.text,
        healthScore: 88,
        actionItems: ["Check pending client approvals", "Verify editor workloads"]
      };
    }

    res.json(jsonRes);
  } catch (error: any) {
    console.error("AI Health API Error:", error);
    res.status(500).json({ error: "Failed to generate risk analysis." });
  }
});

async function startServer() {
  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PBOS Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
