import { useState } from "react";
import { Send, Phone, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuickSuggestions } from "./QuickSuggestions";
import { MessageList } from "./MessageList";
import { useChat } from "@/hooks/useChat";
import { useToast } from "@/hooks/use-toast";

interface ChatWindowProps {
  onClose?: () => void;
}

export const ChatWindow = ({ onClose }: ChatWindowProps) => {
  const [message, setMessage] = useState("");
  const { messages, sendMessage, isLoading, handleUserAction } = useChat();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  const handleHumanAgent = () => {
    toast({
      title: "Transfert vers un agent",
      description: "Un agent va prendre en charge votre demande dans quelques instants...",
    });
  };

  return (
    <div className="flex flex-col h-[calc(600px-64px)]">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <span className="font-medium">Assistant eFoncier</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <MessageList 
          messages={messages} 
          onActionClick={(action, data) => handleUserAction(action, data, onClose)}
          onClose={onClose}
        />
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
          <Button variant="secondary" type="button" onClick={handleHumanAgent}>
            <Phone className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};