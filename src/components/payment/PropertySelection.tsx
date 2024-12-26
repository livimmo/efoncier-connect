import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, MapPin, Calendar } from "lucide-react";
import { SelectFilter } from "@/components/map/filters/SelectFilter";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollArea } from "@/components/ui/scroll-area";

// Données de simulation pour les propriétés
const mockProperties = [
  {
    id: "P001",
    title: "Villa Californie",
    location: {
      address: "15 Boulevard de l'Océan, Californie",
      lat: 33.5731,
      lng: -7.5898
    },
    surface: 450,
    price: 4500,
    fiscal_status: "non_compliant",
    type: "RESIDENTIAL",
    year: 2024
  },
  {
    id: "P002",
    title: "Appartement Gauthier",
    location: {
      address: "45 Rue Jean Jaurès, Gauthier",
      lat: 33.5850,
      lng: -7.6328
    },
    surface: 180,
    price: 1800,
    fiscal_status: "non_compliant",
    type: "RESIDENTIAL",
    year: 2024
  },
  {
    id: "P003",
    title: "Local Commercial Maarif",
    location: {
      address: "156 Rue Zerktouni, Maarif",
      lat: 33.5876,
      lng: -7.6331
    },
    surface: 120,
    price: 2400,
    fiscal_status: "non_compliant",
    type: "COMMERCIAL",
    year: 2024
  }
];

interface PropertySelectionProps {
  onPropertySelect: (property: Property, isSelected: boolean) => void;
  selectedProperties: Property[];
}

export const PropertySelection = ({ onPropertySelect, selectedProperties }: PropertySelectionProps) => {
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { data: properties, isLoading } = useQuery({
    queryKey: ['unpaid-properties'],
    queryFn: async () => {
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockProperties;
    },
  });

  return (
    <div className="space-y-6">
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-4'}`}>
        <div className="space-y-2">
          <Label>Numéro TF</Label>
          <div className="relative">
            <Input placeholder="Ex: TF-12345" className="pl-10" />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Localisation</Label>
          <SelectFilter
            value=""
            onChange={() => {}}
            options={[
              { value: "casablanca", label: "Casablanca" },
              { value: "rabat", label: "Rabat" },
              { value: "tanger", label: "Tanger" },
            ]}
            placeholder="Sélectionner une ville"
          />
        </div>

        <div className="space-y-2">
          <Label>Statut</Label>
          <SelectFilter
            value=""
            onChange={() => {}}
            options={[
              { value: "unpaid", label: "Impayé" },
              { value: "partial", label: "Partiellement payé" },
            ]}
            placeholder="Filtrer par statut"
          />
        </div>

        <div className="space-y-2">
          <Label>Année Fiscale</Label>
          <SelectFilter
            value=""
            onChange={() => {}}
            options={[
              { value: "2024", label: "2024" },
              { value: "2023", label: "2023" },
              { value: "2022", label: "2022" },
            ]}
            placeholder="Sélectionner l'année"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Biens à Payer</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className={isMobile ? "h-[50vh]" : "h-auto"}>
            <div className="space-y-4">
              {properties?.map((property) => (
                <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Checkbox
                      checked={selectedProperties.some(p => p.id === property.id)}
                      onCheckedChange={(checked) => onPropertySelect(property as any, checked as boolean)}
                    />
                    <div className="space-y-1">
                      <div className="font-medium">{property.title}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {property.location.address}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {property.year}
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="font-bold">{property.price} MAD</div>
                    <Badge variant="destructive">
                      Impayé
                    </Badge>
                  </div>
                </div>
              ))}
              {properties?.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  Aucun bien à payer
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};