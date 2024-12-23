import { useState } from "react";
import { Send, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuickSuggestions } from "./QuickSuggestions";
import { MessageList } from "./MessageList";
import { useChat } from "@/hooks/useChat";

export const ChatWindow = () => {
  const [message, setMessage] = useState("");
  const { messages, sendMessage, isLoading } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-[calc(600px-64px)]">
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} />
        {messages.length === 0 && <QuickSuggestions onSelect={sendMessage} />}
      </div>

      <div className="border-t border-border p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tapez votre message..."
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
          <Button variant="secondary" type="button">
            <Phone className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};