import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Filter, X } from "lucide-react";
import { SearchFilters } from "./SearchFilters";
import { SearchResults } from "./SearchResults";
import { cn } from "@/lib/utils";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minSurface: 0,
    maxSurface: 10000,
    minPrice: 0,
    maxPrice: 1000000,
    city: "",
    district: "",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching with query:", query, "and filters:", filters);
  };

  const clearSearch = () => {
    setQuery("");
    setFilters({
      minSurface: 0,
      maxSurface: 10000,
      minPrice: 0,
      maxPrice: 1000000,
      city: "",
      district: "",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <form onSubmit={handleSearch} className="relative">
        <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher par titre foncier, propriétaire..."
          className="pl-10 pr-32 h-12 text-lg"
        />
        <div className="absolute right-2 top-2 flex gap-2">
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={cn("h-8 w-8", showFilters && "bg-accent")}
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button type="submit" className="h-8 bg-primary">
            Rechercher
          </Button>
        </div>
      </form>

      {showFilters && (
        <SearchFilters filters={filters} setFilters={setFilters} />
      )}

      {query && <SearchResults query={query} filters={filters} />}
    </div>
  );
};