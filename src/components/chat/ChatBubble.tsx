import { useState } from "react";
import { MessageCircle, X, MinusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatWindow } from "./ChatWindow";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

export const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <div className="w-full">
        <Button
          className="w-full flex items-center justify-center gap-2"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-5 w-5" />
          <span>Chat avec le support</span>
        </Button>
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-background">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Support eFoncier</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-hidden">
                <ChatWindow />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div
          className={cn(
            "bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out",
            "dark:bg-gray-800 border border-border",
            isMinimized ? "h-14 w-80" : "h-[600px] w-80"
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span className="font-semibold">Support eFoncier</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {!isMinimized && <ChatWindow />}
        </div>
      ) : (
        <Button
          size="lg"
          className="rounded-full h-14 w-14 animate-bounce shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};