import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText, MessageSquare, MapPin } from "lucide-react";
import { mockParcels } from "@/utils/mockData";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAuth } from "@/components/auth/AuthProvider";

interface SearchResultsProps {
  query: string;
  filters: {
    minSurface: number;
    maxSurface: number;
    minPrice: number;
    maxPrice: number;
    city: string;
    district: string;
  };
}

export const SearchResults = ({ query, filters }: SearchResultsProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { profile } = useAuth();

  // Simuler le filtrage des résultats
  const filteredResults = mockParcels.filter((parcel) => {
    const matchesQuery =
      parcel.titleDeedNumber.toLowerCase().includes(query.toLowerCase()) ||
      parcel.ownerName.toLowerCase().includes(query.toLowerCase());

    const matchesFilters =
      parcel.surface >= filters.minSurface &&
      parcel.surface <= filters.maxSurface &&
      (!filters.city || parcel.city.toLowerCase() === filters.city.toLowerCase());

    return matchesQuery && matchesFilters;
  });

  if (filteredResults.length === 0) {
    return (
      <Card className="p-6 text-center text-muted-foreground">
        Aucun résultat trouvé pour votre recherche. Essayez d'autres critères.
      </Card>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {filteredResults.map((parcel) => (
        <Card key={parcel.id} className="p-4">
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
            <div className="space-y-2">
              <h3 className="font-semibold">{parcel.title}</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Titre Foncier: {parcel.titleDeedNumber}</p>
                <p>Propriétaire: {parcel.ownerName}</p>
                <p>Surface: {parcel.surface.toLocaleString()} m²</p>
                <p>
                  Localisation: {parcel.city}
                  {parcel.address && `, ${parcel.address}`}
                </p>
                {profile?.role === "developer" && parcel.price !== undefined && (
                  <p className="font-medium text-primary">
                    Prix: {parcel.price.toLocaleString()} MAD
                  </p>
                )}
              </div>
            </div>
            <div className={`flex ${isMobile ? 'flex-row' : 'flex-row justify-end'} gap-2 ${isMobile ? 'mt-2' : ''}`}>
              <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                <Eye className="w-4 h-4 mr-2" />
                Détails
              </Button>
              {profile?.role === "developer" && (
                <>
                  <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                    <MapPin className="w-4 h-4 mr-2" />
                    Carte
                  </Button>
                </>
              )}
              {profile?.role === "owner" && (
                <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                  <FileText className="w-4 h-4 mr-2" />
                  Documents
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};