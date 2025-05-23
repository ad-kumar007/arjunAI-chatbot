const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fetch = require("node-fetch"); // if node version <18, else native fetch is available

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  if (!process.env.OPENROUTER_API_KEY) {
    console.error("❌ API key not found in environment variables");
    return res.status(500).json({ error: "API key missing" });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173", // optional
        "X-Title": "MyChatApp", // optional
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-8b-instruct:free",
        messages: [...(history || []), { role: "user", content: message }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Error from OpenRouter:", JSON.stringify(data, null, 2));
      return res.status(500).json({ error: "OpenRouter API error", details: data });
    }

    const botReply = data.choices?.[0]?.message?.content;

    if (!botReply) {
      return res.status(500).json({ error: "No reply from OpenRouter" });
    }

    console.log("✅ Bot Reply:", botReply);
    res.json({ reply: botReply });
  } catch (error) {
    console.error("❌ Server error:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log("🔑 Loaded API Key:", process.env.OPENROUTER_API_KEY ? "Yes" : "No");
});
