import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { REGIONS } from "@/utils/mockData/locations";
import { PropertyFilters } from "./useProperties";

interface DeveloperPropertiesFiltersProps {
  filters: PropertyFilters;
  onFiltersChange: (filters: PropertyFilters) => void;
}

export const DeveloperPropertiesFilters = ({ 
  filters, 
  onFiltersChange 
}: DeveloperPropertiesFiltersProps) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Filtres</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Région</Label>
          <Select 
            value={filters.region} 
            onValueChange={(value) => onFiltersChange({ ...filters, region: value })}
          >
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
          <Input 
            placeholder="Entrez le numéro TF" 
            value={filters.titleDeedNumber}
            onChange={(e) => onFiltersChange({ ...filters, titleDeedNumber: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Statut du bien</Label>
          <Select 
            value={filters.status}
            onValueChange={(value) => onFiltersChange({ ...filters, status: value })}
          >
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
          <Select 
            value={filters.fiscalStatus}
            onValueChange={(value) => onFiltersChange({ ...filters, fiscalStatus: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compliant">Payé</SelectItem>
              <SelectItem value="non_compliant">Impayé</SelectItem>
              <SelectItem value="under_review">En révision</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Superficie (m²)</Label>
          <Slider
            value={filters.surfaceRange}
            onValueChange={(value) => onFiltersChange({ ...filters, surfaceRange: value as [number, number] })}
            max={15000}
            step={100}
            className="mt-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.surfaceRange[0]} m²</span>
            <span>{filters.surfaceRange[1]} m²</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Année fiscale</Label>
          <Select 
            value={filters.fiscalYear}
            onValueChange={(value) => onFiltersChange({ ...filters, fiscalYear: value })}
          >
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