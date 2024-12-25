import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SmartSearchInputProps {
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string;
}

export const SmartSearchInput = ({ 
  onSearch, 
  className,
  placeholder = "Rechercher par localisation, type de terrain..."
}: SmartSearchInputProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (query.length > 2) {
      // Mock suggestions - replace with real data in production
      setSuggestions([
        `Localisation: ${query}`,
        `Type: ${query}`,
        `Zone: ${query}`,
      ]);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch(searchQuery);
    setSuggestions([]);
  };

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-4"
        onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
      />
      
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-left hover:bg-accent text-sm"
              onClick={() => handleSearch(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};