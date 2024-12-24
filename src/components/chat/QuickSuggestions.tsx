import { Button } from "@/components/ui/button";
import { Search, CreditCard, HelpCircle, MessageSquare, Settings, Home } from "lucide-react";

interface QuickSuggestionsProps {
  onSelect: (message: string) => void;
}

export const QuickSuggestions = ({ onSelect }: QuickSuggestionsProps) => {
  const suggestions = [
    {
      text: "Rechercher un bien",
      icon: Search,
      message: "Je cherche un bien à Casablanca",
    },
    {
      text: "Voir mes paiements",
      icon: CreditCard,
      message: "Quels sont mes paiements en attente ?",
    },
    {
      text: "Messages",
      icon: MessageSquare,
      message: "Montre-moi mes messages récents",
    },
    {
      text: "Mes biens",
      icon: Home,
      message: "Je veux voir mes biens",
    },
    {
      text: "Paramètres",
      icon: Settings,
      message: "Accéder à mes paramètres",
    },
    {
      text: "Aide",
      icon: HelpCircle,
      message: "J'ai besoin d'aide",
    },
  ];

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground mb-4">
        Comment puis-je vous aider aujourd'hui ?
      </p>
      <div className="grid grid-cols-2 gap-2">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          return (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start text-left"
              onClick={() => onSelect(suggestion.message)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {suggestion.text}
            </Button>
          );
        })}
      </div>
    </div>
  );
};