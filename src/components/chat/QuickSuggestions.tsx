import { Button } from "@/components/ui/button";

interface QuickSuggestionsProps {
  onSelect: (message: string) => void;
}

export const QuickSuggestions = ({ onSelect }: QuickSuggestionsProps) => {
  const suggestions = [
    "Comment m'inscrire sur eFoncier ?",
    "Comment payer mes taxes en ligne ?",
    "Comment rechercher une parcelle ?",
    "Comment télécharger mon relevé fiscal ?",
  ];

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground mb-4">
        Questions fréquentes :
      </p>
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          className="w-full justify-start text-left"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
};