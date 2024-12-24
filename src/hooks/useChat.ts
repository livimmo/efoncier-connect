import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";

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

const INITIAL_GREETING = "Bonjour ! Comment puis-je vous aider aujourd'hui ?";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { content: INITIAL_GREETING, type: "bot" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useAuth();
  const { toast } = useToast();

  const handlePropertySearch = async (query: string) => {
    try {
      const { data: properties, error } = await supabase
        .from("properties")
        .select("*")
        .textSearch("title", query)
        .limit(5);

      if (error) throw error;

      if (properties.length === 0) {
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
        .order("payment_date", { ascending: true })
        .limit(5);

      if (error) throw error;

      if (payments.length === 0) {
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

  const processMessage = async (content: string) => {
    const lowerContent = content.toLowerCase();

    // Property search
    if (lowerContent.includes("bien") || lowerContent.includes("terrain")) {
      return await handlePropertySearch(content);
    }

    // Payment info
    if (
      lowerContent.includes("paiement") ||
      lowerContent.includes("payer") ||
      lowerContent.includes("montant")
    ) {
      return await handlePaymentInfo();
    }

    // Support contact
    if (
      lowerContent.includes("support") ||
      lowerContent.includes("aide") ||
      lowerContent.includes("contact")
    ) {
      return "Pour contacter le support, vous pouvez :\n- Appeler le +212 5XX-XXXXXX\n- Envoyer un email à support@efoncier.ma\n- Utiliser le formulaire de contact sur notre site";
    }

    // Default response
    return "Je ne suis pas sûr de comprendre votre demande. Pouvez-vous reformuler ou choisir une des options suivantes :\n- Rechercher un bien\n- Voir mes paiements\n- Contacter le support";
  };

  const sendMessage = async (content: string) => {
    // Add user message
    setMessages((prev) => [...prev, { content, type: "user" }]);
    setIsLoading(true);

    try {
      const response = await processMessage(content);
      
      setMessages((prev) => [
        ...prev,
        {
          content: response,
          type: "bot",
          actions: [
            { label: "Voir plus de détails", action: "view_details" },
            { label: "Contacter le support", action: "contact_support" },
          ],
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

  return {
    messages,
    sendMessage,
    isLoading,
  };
};