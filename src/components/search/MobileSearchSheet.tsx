import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, X } from "lucide-react";
import { useState } from "react";
import { MobileSearchBar } from "./MobileSearchBar";
import { MobileSearchResults } from "./MobileSearchResults";
import { MobileSearchFilters } from "./MobileSearchFilters";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { SearchFilters } from "./types";

export const MobileSearchSheet = () => {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();
  const [filters, setFilters] = useState<SearchFilters>({
    minSurface: 0,
    maxSurface: 10000,
    minPrice: 0,
    maxPrice: 1000000,
    city: "",
    district: "",
    propertyType: "",
    fiscalStatus: "",
    propertyStatus: "",
    year: "",
    titleDeedNumber: "",
  });

  const handleSearch = () => {
    toast({
      title: "Recherche en cours",
      description: `${query ? `Recherche de "${query}"` : "Tous les biens"} avec les filtres sélectionnés`,
    });
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
      propertyType: "",
      fiscalStatus: "",
      propertyStatus: "",
      year: "",
      titleDeedNumber: "",
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <SearchIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="h-[100dvh] w-full">
        <SheetHeader className="space-y-4 relative">
          <div className="flex items-center justify-between">
            <SheetTitle>Recherche</SheetTitle>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={clearSearch}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <MobileSearchBar
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
            onShowFilters={() => setShowFilters(true)}
          />
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-150px)] w-full">
          {showFilters ? (
            <MobileSearchFilters
              filters={filters}
              setFilters={setFilters}
              onClose={() => setShowFilters(false)}
              onApply={() => {
                setShowFilters(false);
                handleSearch();
              }}
            />
          ) : (
            <MobileSearchResults query={query} filters={filters} />
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};