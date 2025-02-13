"use client";
import { useState } from "react";
import { TextField, Button, MenuItem, Select, Typography, Container } from "@mui/material";
import { FiSend } from "react-icons/fi";
import { IoMdMenu } from "react-icons/io";

const models = [
  { name: "OpenAI GPT-4", api: "openai" },
  { name: "Anthropic Claude", api: "anthropic" },
  { name: "Google Gemini", api: "gemini" },
  { name: "DeepSeek", api: "deepseek" },
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState(models[0].api);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    // Simulated AI response (for testing UI)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: `This is a response from ${selectedModel}` },
      ]);
    }, 1000);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <div className="p-4 bg-white shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Typography variant="h6" className="font-bold text-gray-800">
            RaceAI Chat
          </Typography>
          <Select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            size="small"
            className="bg-gray-200 rounded-md"
          >
            {models.map((m) => (
              <MenuItem key={m.api} value={m.api}>
                {m.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <button className="p-3 rounded-lg text-gray-600 hover:bg-gray-200 transition">
          <IoMdMenu size={24} />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg w-fit max-w-xs break-words ${
              msg.role === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-300 text-black"
            }`}
          >
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
          </div>
        ))}
      </div>

      {/* Chat Input Box */}
      <div className="p-4 bg-white border-t w-full flex justify-center">
        <Container maxWidth="md">
          <div className="flex items-center space-x-2">
            <TextField
              fullWidth
              placeholder="Type your message..."
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="rounded-lg"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={sendMessage}
              className="p-2"
            >
              <FiSend />
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}

