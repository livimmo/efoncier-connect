import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Building, ArrowRight, Eye } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { Parcel } from "@/utils/mockData/types";

export interface SearchResultsProps {
  results: Parcel[];
  isLoading: boolean;
  query?: string;
  filters?: {
    minSurface: number;
    maxSurface: number;
    minPrice: number;
    maxPrice: number;
    city: string;
    district: string;
  };
  onParcelSelect?: (parcel: Parcel) => void;
}

export const SearchResults = ({ 
  results, 
  isLoading, 
  query, 
  filters,
  onParcelSelect 
}: SearchResultsProps) => {
  const { profile } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">Aucun résultat trouvé</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {results.map((parcel) => (
        <Card key={parcel.id} className="hover:bg-accent/50 transition-colors">
          <CardHeader className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{parcel.titleDeedNumber}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{parcel.address}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onParcelSelect?.(parcel)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Voir détails
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center text-sm">
                <Building className="w-4 h-4 mr-1 text-muted-foreground" />
                <span>{parcel.surface} m²</span>
              </div>
              <div className="text-sm text-right">
                <span className="text-muted-foreground">TNB: </span>
                <span className="font-medium">
                  {formatCurrency(parcel.tnbInfo.totalAmount)} DHS
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};