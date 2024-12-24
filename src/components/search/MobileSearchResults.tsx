import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, MessageSquare, MapPin } from "lucide-react";
import { mockParcels } from "@/utils/mockData";
import type { SearchFilters } from "./types";
import { useAuth } from "@/components/auth/AuthProvider";

interface MobileSearchResultsProps {
  query: string;
  filters: SearchFilters;
}

export const MobileSearchResults = ({ query, filters }: MobileSearchResultsProps) => {
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
      <div className="h-full flex flex-col items-center justify-center text-center p-4">
        <p className="text-muted-foreground mb-2">
          Aucun résultat trouvé pour votre recherche.
        </p>
        <p className="text-sm text-muted-foreground">
          Essayez avec d'autres mots-clés ou modifiez vos filtres.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-12rem)] -mx-6">
      <div className="px-6 space-y-4">
        {filteredResults.map((parcel) => (
          <Card key={parcel.id} className="p-4">
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
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  Détails
                </Button>
                {profile?.role === "developer" && (
                  <>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MapPin className="w-4 h-4 mr-2" />
                      Carte
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};