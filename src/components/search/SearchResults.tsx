import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, FileText, MessageSquare } from "lucide-react";
import { mockParcels } from "@/utils/mockData";

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">{parcel.title}</h3>
              <div className="text-sm text-muted-foreground">
                <p>Titre Foncier: {parcel.titleDeedNumber}</p>
                <p>Propriétaire: {parcel.ownerName}</p>
                <p>Surface: {parcel.surface} m²</p>
                <p>
                  Localisation: {parcel.city}
                  {parcel.address && `, ${parcel.address}`}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Détails
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Payer
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contacter
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};