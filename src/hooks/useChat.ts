import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { Message, MessageAction } from "@/types/chat";
import { INITIAL_GREETING, handlePropertySearch, handlePaymentInfo } from "@/utils/chatUtils";
import { useChatNavigation } from "./useChatNavigation";

export type { Message, MessageAction };

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useAuth();
  const { toast } = useToast();
  const { handleUserAction } = useChatNavigation();

  const processMessage = async (content: string) => {
    const lowerContent = content.toLowerCase();

    // Property search
    if (
      lowerContent.includes("bien") ||
      lowerContent.includes("terrain") ||
      lowerContent.includes("recherche")
    ) {
      const response = await handlePropertySearch(content);
      return {
        content: response,
        actions: [
          { label: "Voir sur la carte", action: "view_map" },
          { label: "Filtrer les résultats", action: "filter_results" },
        ],
      };
    }

    // Payment info
    if (
      lowerContent.includes("paiement") ||
      lowerContent.includes("payer") ||
      lowerContent.includes("montant")
    ) {
      const response = await handlePaymentInfo(profile?.id);
      return {
        content: response,
        actions: [
          { label: "Payer maintenant", action: "make_payment" },
          { label: "Voir l'historique", action: "payment_history" },
        ],
      };
    }

    // Support contact
    if (
      lowerContent.includes("support") ||
      lowerContent.includes("aide") ||
      lowerContent.includes("contact")
    ) {
      return {
        content: "Comment puis-je vous aider ?\n\n- Contacter le support\n- Consulter la FAQ\n- Créer un ticket",
        actions: [
          { label: "Contacter le support", action: "contact_support" },
          { label: "Voir la FAQ", action: "view_faq" },
          { label: "Créer un ticket", action: "create_ticket" },
        ],
      };
    }

    // Default response with suggestions
    return {
      content: "Je ne suis pas sûr de comprendre votre demande. Voici ce que je peux faire pour vous :",
      actions: [
        { label: "Rechercher un bien", action: "search_properties" },
        { label: "Voir mes paiements", action: "make_payment" },
        { label: "Contacter le support", action: "contact_support" },
      ],
    };
  };

  const sendMessage = async (content: string) => {
    setMessages((prev) => [...prev, { content, type: "user" }]);
    setIsLoading(true);

    try {
      const response = await processMessage(content);
      
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

  // Initialize chat with greeting on mount
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          content: INITIAL_GREETING(profile?.first_name),
          type: "bot",
          actions: [
            { label: "Rechercher un bien", action: "search_properties" },
            { label: "Gérer mes biens", action: "manage_properties" },
            { label: "Effectuer un paiement", action: "make_payment" },
            { label: "Voir mes messages", action: "view_messages" },
            { label: "Paramètres", action: "view_settings" },
            { label: "Aide", action: "get_help" },
          ],
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