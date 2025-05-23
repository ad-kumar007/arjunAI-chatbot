import React, { useState } from "react";
import Header from "../Components/Header";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Format chat history for backend
  const getHistory = () =>
    messages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }));

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          history: getHistory(),
        }),
      });

      const data = await response.json();

      console.log("📥 Backend Response:", data);

      if (data.reply) {
        const botMessage = { sender: "bot", text: data.reply };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error("No reply from API");
      }
    } catch (err) {
      console.error("⚠️ Error in frontend:", err.message || err);
      const errorMsg = {
        sender: "bot",
        text: "Oops! Something went wrong.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/12.svg')" }}
    >
      <Header />

      <div
        className="flex flex-col justify-between max-w-4xl mx-auto h-[80vh] mt-4 bg-black/40 rounded-xl shadow-lg overflow-hidden"
        style={{ marginTop: "-30px" }} // shift container up
      >
        <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`inline-block px-4 py-2 rounded-lg break-words whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-blue-600 self-end text-right ml-auto"
                  : "bg-gray-700 self-start text-left mr-auto"
              }`}
              style={{ maxWidth: "70%" }} // bubble max width
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex p-4 bg-black/60 backdrop-blur-md">
          <input
            type="text"
            className="flex-1 p-3 rounded-l-lg bg-white text-black focus:outline-none"
            placeholder="Ask ArjunAI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="px-6 bg-[#020236] text-white rounded-r-lg hover:bg-blue-900 transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
