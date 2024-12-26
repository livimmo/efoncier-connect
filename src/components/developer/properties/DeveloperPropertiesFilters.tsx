import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { REGIONS } from "@/utils/mockData/locations";
import { RangeFilter } from "@/components/map/filters/RangeFilter";

interface DeveloperPropertiesFiltersProps {
  onRegionChange?: (regionId: string) => void;
  onSurfaceChange?: (value: [number, number]) => void;
  onPriceChange?: (value: [number, number]) => void;
  surfaceRange: [number, number];
  priceRange: [number, number];
}

export const DeveloperPropertiesFilters = ({ 
  onRegionChange,
  onSurfaceChange,
  onPriceChange,
  surfaceRange,
  priceRange
}: DeveloperPropertiesFiltersProps) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Filtres</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Région</Label>
          <Select onValueChange={(value) => onRegionChange?.(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une région" />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((region) => (
                <SelectItem key={region.id} value={region.id}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Numéro TF</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Disponible</SelectItem>
              <SelectItem value="unavailable">Indisponible</SelectItem>
              <SelectItem value="in_transaction">En Transaction</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Statut du bien</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Disponible</SelectItem>
              <SelectItem value="unavailable">Indisponible</SelectItem>
              <SelectItem value="in_transaction">En Transaction</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Statut fiscal</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paid">Payé</SelectItem>
              <SelectItem value="unpaid">Impayé</SelectItem>
              <SelectItem value="partial">Partiellement payé</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Superficie (m²)</Label>
          <RangeFilter
            value={surfaceRange}
            onChange={onSurfaceChange || (() => {})}
            min={0}
            max={15000}
            step={100}
            unit="m²"
          />
        </div>

        <div className="space-y-4">
          <Label>Prix (DHS)</Label>
          <RangeFilter
            value={priceRange}
            onChange={onPriceChange || (() => {})}
            min={0}
            max={20000000}
            step={100000}
            unit="DHS"
          />
        </div>

        <div className="space-y-2">
          <Label>Année fiscale</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une année" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};