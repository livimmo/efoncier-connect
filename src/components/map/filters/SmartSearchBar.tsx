import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Home, Building2, Ruler, CircleDollarSign, Star } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { mockParcels } from '@/utils/mockData/parcels';
import { REGIONS } from '@/utils/mockData/locations';

interface SmartSearchResult {
  type: 'property' | 'location' | 'status' | 'document';
  title: string;
  subtitle?: string;
  status?: 'available' | 'pending' | 'sold';
  surface?: number;
  price?: number;
  icon?: React.ReactNode;
}

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
  const [results, setResults] = useState<SmartSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge variant="secondary" className="bg-green-500/10 text-green-500">Disponible 🟢</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">En Transaction 🟠</Badge>;
      case 'sold':
        return <Badge variant="secondary" className="bg-red-500/10 text-red-500">Vendu 🔴</Badge>;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (query.length > 2) {
      setIsSearching(true);
      
      // Simuler une recherche avec un délai
      const timer = setTimeout(() => {
        const searchResults: SmartSearchResult[] = [];

        // Recherche dans les parcelles
        const matchingParcels = mockParcels.filter(parcel => 
          parcel.titleDeedNumber.toLowerCase().includes(query.toLowerCase()) ||
          parcel.city.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 3);

        matchingParcels.forEach(parcel => {
          searchResults.push({
            type: 'property',
            title: `${parcel.type} - ${parcel.city}`,
            subtitle: `${parcel.surface}m² - ${parcel.price.toLocaleString()} DH/m²`,
            status: parcel.status.toLowerCase() as 'available' | 'pending' | 'sold',
            surface: parcel.surface,
            price: parcel.price,
            icon: <Home className="h-4 w-4" />
          });
        });

        // Recherche dans les régions
        const matchingRegions = REGIONS.filter(region =>
          region.name.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 2);

        matchingRegions.forEach(region => {
          searchResults.push({
            type: 'location',
            title: region.name,
            subtitle: `${region.communes.length} communes`,
            icon: <MapPin className="h-4 w-4" />
          });
        });

        setResults(searchResults);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Recherchez un terrain, une ville, une commune, une référence Titre Foncier..."
          className="pl-9 pr-4"
        />
      </div>
      
      {results.length > 0 && (
        <ScrollArea className="h-[300px] rounded-md border bg-background">
          <div className="p-4 space-y-4">
            {results.map((result, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-2 hover:bg-accent rounded-md cursor-pointer"
                onClick={() => {
                  setQuery(result.title);
                  onSearch(result.title);
                }}
              >
                <div className="mt-1">{result.icon}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{result.title}</p>
                    {result.status && getStatusBadge(result.status)}
                  </div>
                  {result.subtitle && (
                    <p className="text-sm text-muted-foreground">
                      {result.subtitle}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      {isSearching && (
        <div className="text-sm text-muted-foreground text-center py-2">
          Recherche en cours...
        </div>
      )}
    </div>
  );
};