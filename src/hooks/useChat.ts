import { useState } from "react";

export interface Message {
  content: string;
  type: "user" | "bot";
}

const INITIAL_GREETING = "Bonjour ! Comment puis-je vous aider aujourd'hui ?";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { content: INITIAL_GREETING, type: "bot" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    // Add user message
    setMessages((prev) => [...prev, { content, type: "user" }]);
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          content: "Je comprends votre question. Un agent va vous répondre dans quelques instants.",
          type: "bot",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return {
    messages,
    sendMessage,
    isLoading,
  };
};