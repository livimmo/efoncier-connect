import { cn } from "@/lib/utils";
import { Message } from "@/hooks/useChat";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface MessageListProps {
  messages: Message[];
  onActionClick?: (action: string, data?: any) => void;
}

export const MessageList = ({ messages, onActionClick }: MessageListProps) => {
  const { toast } = useToast();

  const handleActionClick = (action: string, data?: any) => {
    if (onActionClick) {
      onActionClick(action, data);
    } else {
      toast({
        title: "Action en cours",
        description: `Action "${action}" en cours de traitement...`,
      });
    }
  };

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
                      onClick={() => handleActionClick(action.action, action.data)}
                      className="text-sm bg-primary hover:bg-primary/90 text-white font-medium shadow-sm"
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