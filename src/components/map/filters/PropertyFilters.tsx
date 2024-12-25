import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { MapFilters } from "../types";
import { ZONING_OPTIONS, PAYMENT_STATUS_OPTIONS } from "./filterConstants";

interface PropertyFiltersProps {
  filters: MapFilters;
  setFilters: (filters: MapFilters) => void;
}

export const PropertyFilters = ({ filters, setFilters }: PropertyFiltersProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label>Type de propriété</Label>
        <Select
          value={filters.propertyType}
          onValueChange={(value) => setFilters({ ...filters, propertyType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="RESIDENTIAL">Résidentiel</SelectItem>
            <SelectItem value="COMMERCIAL">Commercial</SelectItem>
            <SelectItem value="INDUSTRIAL">Industriel</SelectItem>
            <SelectItem value="AGRICULTURAL">Agricole</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Zonage</Label>
        <Select
          value={filters.zoning}
          onValueChange={(value) => setFilters({ ...filters, zoning: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un zonage" />
          </SelectTrigger>
          <SelectContent>
            {ZONING_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label>Superficie (m²)</Label>
        <Slider
          defaultValue={[0, 15000]}
          max={15000}
          step={100}
          value={filters.size}
          onValueChange={(value) => setFilters({ ...filters, size: value as [number, number] })}
          className="mt-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>0 m²</span>
          <span>15 000 m²</span>
        </div>
      </div>
    </>
  );
};