import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw, List } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface SmartSearchBarProps {
  onSearch: (query: string) => void;
  onReset: () => void;
  onViewListResults: () => void;
  className?: string;
}

export const SmartSearchBar = ({
  onSearch,
  onReset,
  onViewListResults,
  className
}: SmartSearchBarProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  // Simulated suggestions based on query
  useEffect(() => {
    if (query.length > 2) {
      // This would be replaced with actual API calls in production
      const mockSuggestions = [
        `TF-${query}`,
        `Casablanca - ${query}`,
        `Propriétaire: ${query}`,
      ];
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      toast({
        title: "Recherche lancée",
        description: `Recherche en cours pour : ${query}`,
      });
    }
  };

  const handleReset = () => {
    setQuery('');
    setSuggestions([]);
    onReset();
    toast({
      title: "Filtres réinitialisés",
      description: "Tous les critères de recherche ont été effacés.",
    });
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Recherchez par TF, Région, Ville, Propriétaire..."
          className="pl-9 pr-4"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>
      
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-background border rounded-md shadow-lg mt-1">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-left hover:bg-accent text-sm"
              onClick={() => {
                setQuery(suggestion);
                setSuggestions([]);
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Button 
          onClick={handleSearch}
          className="flex-1"
        >
          <Search className="h-4 w-4 mr-2" />
          Rechercher
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          size="icon"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          onClick={onViewListResults}
          size="icon"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};