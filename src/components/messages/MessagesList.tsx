import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";

export interface MessagesListProps {
  messages: Message[];
  onMessageSelect: (id: string) => void;
}

export const MessagesList = ({ messages, onMessageSelect }: MessagesListProps) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "p-4 rounded-lg border cursor-pointer transition-colors",
            message.status === "unread" 
              ? "bg-accent" 
              : "hover:bg-accent/50"
          )}
          onClick={() => onMessageSelect(message.id)}
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold truncate">{message.subject}</h3>
            <Badge variant={message.status === "unread" ? "secondary" : "outline"}>
              {message.status === "unread" ? "Non Lu" : "Lu"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {message.participant}
          </p>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <span>{message.location}</span>
            <span>•</span>
            <span>{message.lastMessage}</span>
          </div>
        </div>
      ))}
    </div>
  );
};