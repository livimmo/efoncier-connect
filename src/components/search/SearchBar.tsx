import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Filter, X, MapPin } from "lucide-react";
import { SearchFilters } from "./SearchFilters";
import { SearchResults } from "./SearchResults";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAuth } from "@/components/auth/AuthProvider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { profile } = useAuth();
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
    setIsLoading(true);
    // Simulate search
    setTimeout(() => {
      setResults([]);
      setIsLoading(false);
    }, 1000);
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

  const FiltersContent = () => (
    <SearchFilters filters={filters} setFilters={setFilters} />
  );

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSearch} className="relative">
        <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher par titre foncier, propriétaire..."
          className="pl-10 pr-32 h-12 text-base md:text-lg"
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
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={cn("h-8 w-8", showFilters && "bg-accent")}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle>Filtres de Recherche</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={cn("h-8 w-8", showFilters && "bg-accent")}
            >
              <Filter className="h-4 w-4" />
            </Button>
          )}
          <Button type="submit" className="h-8 bg-primary">
            Rechercher
          </Button>
        </div>
      </form>

      {!isMobile && showFilters && <FiltersContent />}

      {profile?.role === "developer" && (
        <Button variant="outline" className="w-full md:w-auto">
          <MapPin className="w-4 h-4 mr-2" />
          Voir sur la carte
        </Button>
      )}

      {query && (
        <SearchResults 
          query={query} 
          filters={filters} 
          results={results}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};