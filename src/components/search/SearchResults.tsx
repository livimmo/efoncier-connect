import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Property } from "@/types";
import { MapPin, Building, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SearchResultsProps {
  results: Property[];
  isLoading: boolean;
}

export const SearchResults = ({ results, isLoading }: SearchResultsProps) => {
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
    <div>
      {profile?.role === "owner" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((property) => (
            <Card key={property.id}>
              <CardHeader>
                <CardTitle className="text-lg">{property.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{property.location.address}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-1" />
                      <span>{property.property_type}</span>
                    </div>
                    <span>{property.surface_area} m²</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status fiscal:</span>
                    <span className={`capitalize ${
                      property.fiscal_status === "compliant" ? "text-green-600" :
                      property.fiscal_status === "non_compliant" ? "text-red-600" :
                      "text-yellow-600"
                    }`}>
                      {property.fiscal_status.replace("_", " ")}
                    </span>
                  </div>
                  <Button asChild className="w-full mt-4">
                    <Link to={`/property/${property.id}`}>
                      Voir les détails
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((property) => (
            <Card key={property.id}>
              <CardHeader>
                <CardTitle className="text-lg">{property.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{property.location.address}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-1" />
                      <span>{property.property_type}</span>
                    </div>
                    <span>{property.surface_area} m²</span>
                  </div>
                  {property.is_for_sale && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Prix:</span>
                      <span className="font-semibold">{property.price.toLocaleString()} DH</span>
                    </div>
                  )}
                  <Button asChild className="w-full mt-4">
                    <Link to={`/property/${property.id}`}>
                      {property.is_for_sale ? "Voir l'annonce" : "Voir les détails"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};