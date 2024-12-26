import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { Message, MessageAction } from "@/types/chat";
import { INITIAL_GREETING, processMessage, getQuickActions } from "@/utils/chatUtils";
import { useChatNavigation } from "./useChatNavigation";

export type { Message, MessageAction };

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useAuth();
  const { toast } = useToast();
  const { handleUserAction } = useChatNavigation();

  const sendMessage = async (content: string) => {
    setMessages((prev) => [...prev, { content, type: "user" }]);
    setIsLoading(true);

    try {
      const response = await processMessage(content, profile?.role);
      
      setMessages((prev) => [
        ...prev,
        {
          content: response.content,
          type: "bot",
          actions: response.actions,
        },
      ]);
    } catch (error) {
      console.error("Error processing message:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du traitement de votre message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize chat with role-specific greeting on mount
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          content: INITIAL_GREETING(profile?.first_name, profile?.role),
          type: "bot",
          actions: getQuickActions(profile?.role),
        },
      ]);
    }
  }, [profile, messages.length]);

  return {
    messages,
    sendMessage,
    isLoading,
    handleUserAction,
  };
};