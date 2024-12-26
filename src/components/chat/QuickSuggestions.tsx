interface QuickSuggestionsProps {
  onSelect: (suggestion: string) => void;
}

export const QuickSuggestions = ({ onSelect }: QuickSuggestionsProps) => {
  const suggestions = [
    "Comment payer ma taxe TNB ?",
    "Je souhaite consulter mes biens",
    "Quels documents sont requis pour une transaction ?",
    "Quand dois-je renouveler ma taxe TNB ?",
    "Je veux contacter un agent humain",
  ];

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">Questions fréquentes :</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect(suggestion)}
            className="text-sm bg-secondary/50 hover:bg-secondary px-3 py-1.5 rounded-full text-secondary-foreground transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};