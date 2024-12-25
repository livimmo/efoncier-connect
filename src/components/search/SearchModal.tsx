import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, X } from "lucide-react";
import { useState } from "react";
import { SearchResults } from "./SearchResults";
import { SearchFilters } from "./SearchFilters";
import { PropertyPopup } from "../map/property-popup/PropertyPopup";
import { mockParcels } from "@/utils/mockData/parcels";
import { useToast } from "@/hooks/use-toast";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState<any>(null);
  const { toast } = useToast();
  
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
    
    // Simulate search with mock data
    setTimeout(() => {
      const filteredResults = mockParcels.filter(parcel => 
        parcel.titleDeedNumber.toLowerCase().includes(query.toLowerCase()) ||
        parcel.address.toLowerCase().includes(query.toLowerCase())
      );
      
      if (filteredResults.length === 0) {
        toast({
          title: "Aucun résultat",
          description: "Aucun bien ne correspond à votre recherche.",
          variant: "destructive",
        });
      }
      
      setResults(filteredResults);
      setIsLoading(false);
    }, 500);
  };

  const handleParcelSelect = (parcel: any) => {
    setSelectedParcel(parcel);
  };

  const placeholders = [
    "Recherchez par titre foncier...",
    "Trouvez un terrain par ville...",
    "Recherchez un propriétaire...",
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Rotate placeholders every 3 seconds
  useState(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((current) => (current + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[800px] p-0">
        <div className="p-6 space-y-6">
          <form onSubmit={handleSearch} className="relative">
            <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholders[placeholderIndex]}
              className="pl-10 pr-10 h-12 text-lg"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </form>

          {showFilters && (
            <SearchFilters filters={filters} setFilters={setFilters} />
          )}

          {query && (
            <SearchResults 
              query={query} 
              filters={filters} 
              results={results}
              isLoading={isLoading}
              onParcelSelect={handleParcelSelect}
            />
          )}
        </div>
      </DialogContent>

      {selectedParcel && (
        <PropertyPopup
          parcel={selectedParcel}
          open={!!selectedParcel}
          onOpenChange={() => setSelectedParcel(null)}
        />
      )}
    </Dialog>
  );
};