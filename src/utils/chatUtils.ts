import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/types/auth";

export const INITIAL_GREETING = (firstName?: string, role?: UserRole) => {
  if (!role) {
    return "Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?";
  }

  switch (role) {
    case "owner":
      return `Bonjour${firstName ? ` ${firstName}` : ""}, prêt à gérer vos biens ou payer votre TNB ?`;
    case "developer":
      return `Bonjour${firstName ? ` ${firstName}` : ""}, souhaitez-vous consulter les biens disponibles ?`;
    case "commune":
      return `Bonjour${firstName ? ` ${firstName}` : ""}, comment puis-je vous assister dans la gestion des biens de votre commune ?`;
    default:
      return "Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?";
  }
};

export const getQuickActions = (role?: UserRole) => {
  const commonActions = [
    { label: "Voir les documents disponibles", action: "view_documents" },
    { label: "Obtenir de l'aide", action: "get_help" },
  ];

  switch (role) {
    case "owner":
      return [
        ...commonActions,
        { label: "Effectuer un paiement TNB", action: "make_payment" },
        { label: "Localiser mes biens", action: "locate_properties" },
        { label: "Consulter mes notifications", action: "view_notifications" },
      ];
    case "developer":
      return [
        ...commonActions,
        { label: "Voir les biens disponibles", action: "view_available_properties" },
        { label: "Mes favoris", action: "view_favorites" },
        { label: "Contacter un propriétaire", action: "contact_owner" },
      ];
    case "commune":
      return [
        ...commonActions,
        { label: "Voir les paiements en attente", action: "view_pending_payments" },
        { label: "Générer un rapport", action: "generate_report" },
        { label: "Gérer les biens", action: "manage_properties" },
      ];
    default:
      return [
        { label: "Voir les biens", action: "view_properties" },
        { label: "Créer un compte", action: "register" },
        { label: "Contacter le support", action: "contact_support" },
      ];
  }
};

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

export const processMessage = async (content: string, role?: UserRole) => {
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

  // Payment info - Owner specific
  if (role === "owner" && (
    lowerContent.includes("paiement") ||
    lowerContent.includes("payer") ||
    lowerContent.includes("tnb")
  )) {
    return {
      content: "Souhaitez-vous effectuer un paiement TNB maintenant ?",
      actions: [
        { label: "Payer maintenant", action: "make_payment" },
        { label: "Voir l'historique", action: "payment_history" },
      ],
    };
  }

  // Document requests - Developer specific
  if (role === "developer" && (
    lowerContent.includes("document") ||
    lowerContent.includes("dossier")
  )) {
    return {
      content: "Voici les options disponibles pour les documents :",
      actions: [
        { label: "Demander les documents", action: "request_documents" },
        { label: "Voir mes documents", action: "view_my_documents" },
      ],
    };
  }

  // Commune specific - Reports and management
  if (role === "commune" && (
    lowerContent.includes("rapport") ||
    lowerContent.includes("statistique")
  )) {
    return {
      content: "Quel type de rapport souhaitez-vous générer ?",
      actions: [
        { label: "Rapport des paiements", action: "payment_report" },
        { label: "Rapport des biens", action: "property_report" },
      ],
    };
  }

  // Support contact
  if (
    lowerContent.includes("support") ||
    lowerContent.includes("aide") ||
    lowerContent.includes("agent") ||
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

  // Default response with role-specific suggestions
  return {
    content: "Je ne suis pas sûr de comprendre votre demande. Voici ce que je peux faire pour vous :",
    actions: getQuickActions(role),
  };
};