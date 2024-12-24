import { supabase } from "@/integrations/supabase/client";

export const INITIAL_GREETING = (firstName?: string) => `
Bonjour${firstName ? ` ${firstName}` : ''} ! 👋
Comment puis-je vous aider aujourd'hui ?
`;

export const handlePropertySearch = async (query: string) => {
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

export const handlePaymentInfo = async (profileId?: string) => {
  if (!profileId) return "Veuillez vous connecter pour voir vos paiements.";

  try {
    const { data: payments, error } = await supabase
      .from("payments")
      .select("*")
      .eq("user_id", profileId)
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