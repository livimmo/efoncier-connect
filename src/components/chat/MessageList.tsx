import { cn } from "@/lib/utils";
import { Message } from "@/hooks/useChat";
import { Button } from "@/components/ui/button";

interface MessageListProps {
  messages: Message[];
  onActionClick?: (action: string, data?: any) => void;
}

export const MessageList = ({ messages, onActionClick }: MessageListProps) => {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "flex",
            message.type === "user" ? "justify-end" : "justify-start"
          )}
        >
          <div
            className={cn(
              "max-w-[80%] rounded-lg px-4 py-2 space-y-2",
              message.type === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            )}
          >
            <div className="whitespace-pre-wrap">{message.content}</div>
            {message.actions && message.actions.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {message.actions.map((action, actionIndex) => (
                  <Button
                    key={actionIndex}
                    variant="outline"
                    size="sm"
                    onClick={() => onActionClick?.(action.action, action.data)}
                    className="text-xs"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};