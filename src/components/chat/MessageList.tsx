import { cn } from "@/lib/utils";
import { Message } from "@/hooks/useChat";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MessageListProps {
  messages: Message[];
  onActionClick?: (action: string, data?: any) => void;
}

export const MessageList = ({ messages, onActionClick }: MessageListProps) => {
  return (
    <ScrollArea className="h-full pr-4">
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
                  ? "chat-message-user"
                  : "chat-message-bot"
              )}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              {message.actions && message.actions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {message.actions.map((action, actionIndex) => (
                    <Button
                      key={actionIndex}
                      variant="secondary"
                      size="sm"
                      onClick={() => onActionClick?.(action.action, action.data)}
                      className="text-xs bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
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
    </ScrollArea>
  );
};