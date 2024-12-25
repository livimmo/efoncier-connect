import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { REGIONS } from "@/utils/mockData/locations";
import { MapFilters } from "../types";

interface LocationFilterProps {
  filters: MapFilters;
  onRegionChange: (value: string) => void;
  onCityChange: (value: string) => void;
  setFilters: (filters: MapFilters) => void;
}

export const LocationFilter = ({ 
  filters, 
  onRegionChange, 
  onCityChange, 
  setFilters 
}: LocationFilterProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Région</Label>
        <Select 
          value={filters.region} 
          onValueChange={(value) => {
            setFilters({ ...filters, region: value });
            onRegionChange(value);
          }}
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
        <Label>Ville</Label>
        <Select
          value={filters.commune}
          onValueChange={(value) => {
            setFilters({ ...filters, commune: value });
            onCityChange(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une ville" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Casablanca">Casablanca</SelectItem>
            <SelectItem value="Rabat">Rabat</SelectItem>
            <SelectItem value="Marrakech">Marrakech</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};