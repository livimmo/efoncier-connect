import { Button } from "@/components/ui/button";
import { Search, CreditCard, HelpCircle, Plus } from "lucide-react";

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
      text: "Contacter le support",
      icon: HelpCircle,
      message: "Je souhaite contacter le support",
    },
    {
      text: "Ajouter un bien",
      icon: Plus,
      message: "Comment ajouter un nouveau bien ?",
    },
  ];

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground mb-4">
        Comment puis-je vous aider ?
      </p>
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
  );
};