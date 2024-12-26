import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, MapPin, Calendar } from "lucide-react";
import { SelectFilter } from "@/components/map/filters/SelectFilter";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface PropertySelectionProps {
  onPropertySelect: (property: Property, isSelected: boolean) => void;
  selectedProperties: Property[];
}

export const PropertySelection = ({ onPropertySelect, selectedProperties }: PropertySelectionProps) => {
  const { toast } = useToast();

  const { data: properties, isLoading } = useQuery({
    queryKey: ['unpaid-properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('fiscal_status', 'non_compliant');

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les biens",
          variant: "destructive",
        });
        throw error;
      }

      return data as Property[];
    },
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="space-y-2">
          <Label>Numéro TF</Label>
          <div className="relative">
            <Input placeholder="Ex: TF-12345" />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
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
          <div className="space-y-4">
            {properties?.map((property) => (
              <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={selectedProperties.some(p => p.id === property.id)}
                    onCheckedChange={(checked) => onPropertySelect(property, checked as boolean)}
                  />
                  <div className="space-y-1">
                    <div className="font-medium">{property.title}</div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.location.address}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date().getFullYear()}
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
        </CardContent>
      </Card>
    </div>
  );
};