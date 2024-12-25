import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { REGIONS } from "@/utils/mockData/locations";

interface DeveloperPropertiesFiltersProps {
  onRegionChange?: (regionId: string) => void;
}

export const DeveloperPropertiesFilters = ({ onRegionChange }: DeveloperPropertiesFiltersProps) => {
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
          <Input placeholder="Entrez le numéro TF" />
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
          <Slider
            defaultValue={[0, 15000]}
            max={15000}
            step={100}
            className="mt-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0 m²</span>
            <span>15 000 m²</span>
          </div>
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