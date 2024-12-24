import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export type MessageAction = {
  label: string;
  action: string;
  data?: any;
};

export type Message = {
  id?: string;
  content: string;
  type: "user" | "bot";
  actions?: MessageAction[];
};

const INITIAL_GREETING = (firstName?: string) => `
Bonjour${firstName ? ` ${firstName}` : ''} ! 👋
Comment puis-je vous aider aujourd'hui ?
`;

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePropertySearch = async (query: string) => {
    try {
      const { data: properties, error } = await supabase
        .from("properties")
        .select("*")
        .textSearch("title", query)
        .limit(5);

      if (error) throw error;

      if (!properties?.length) {
        return "Je n'ai trouvé aucun bien correspondant à votre recherche.";
      }

      const propertiesList = properties
        .map(
          (p) =>
            `- ${p.title} (${p.surface_area}m²) - ${
              p.is_for_sale ? "En vente" : "Non disponible"
            }`
        )
        .join("\n");

      return `Voici les biens trouvés :\n${propertiesList}`;
    } catch (error) {
      console.error("Error searching properties:", error);
      return "Désolé, une erreur est survenue lors de la recherche.";
    }
  };

  const handlePaymentInfo = async () => {
    if (!profile) return "Veuillez vous connecter pour voir vos paiements.";

    try {
      const { data: payments, error } = await supabase
        .from("payments")
        .select("*")
        .eq("user_id", profile.id)
        .order("payment_date", { ascending: false })
        .limit(5);

      if (error) throw error;

      if (!payments?.length) {
        return "Vous n'avez aucun paiement en attente.";
      }

      const paymentsList = payments
        .map(
          (p) =>
            `- ${p.amount} MAD (${
              p.status === "pending" ? "En attente" : "Payé"
            })`
        )
        .join("\n");

      return `Voici vos derniers paiements :\n${paymentsList}`;
    } catch (error) {
      console.error("Error fetching payments:", error);
      return "Désolé, une erreur est survenue lors de la récupération des paiements.";
    }
  };

  const handleUserAction = (action: string, data?: any) => {
    switch (action) {
      case "search_properties":
        navigate("/search");
        break;
      case "manage_properties":
        navigate("/dashboard?tab=properties");
        break;
      case "make_payment":
        navigate("/payment");
        break;
      case "view_messages":
        navigate("/messages");
        break;
      case "view_settings":
        navigate("/profile/settings");
        break;
      case "get_help":
        navigate("/support");
        break;
      default:
        console.log("Unknown action:", action);
    }
  };

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
      const response = await handlePaymentInfo();
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
  useState(() => {
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
  }, [profile]);

  return {
    messages,
    sendMessage,
    isLoading,
    handleUserAction,
  };
};