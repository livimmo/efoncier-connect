import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { MapFilters } from "../types";

interface SurfaceFilterProps {
  filters: MapFilters;
  onFilterChange: (filterType: string, value: string) => void;
  setFilters: (filters: MapFilters) => void;
}

export const SurfaceFilter = ({ filters, onFilterChange, setFilters }: SurfaceFilterProps) => {
  return (
    <div className="space-y-4">
      <Label>Superficie (m²)</Label>
      <Slider
        defaultValue={[0, 15000]}
        max={15000}
        step={100}
        value={filters.size}
        onValueChange={(value) => {
          setFilters({ ...filters, size: value as [number, number] });
          onFilterChange('size', value.join(','));
        }}
        className="mt-2"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>0 m²</span>
        <span>15 000 m²</span>
      </div>
    </div>
  );
};