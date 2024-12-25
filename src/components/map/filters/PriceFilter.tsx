import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { MapFilters } from "../types";
import { formatCurrency } from "@/utils/format";

interface PriceFilterProps {
  filters: MapFilters;
  onFilterChange: (filterType: string, value: number) => void;
  setFilters: (filters: MapFilters) => void;
}

export const PriceFilter = ({ filters, onFilterChange, setFilters }: PriceFilterProps) => {
  return (
    <div className="space-y-4">
      <Label>Prix (MAD)</Label>
      <Slider
        min={0}
        max={20000000}
        step={100000}
        value={[filters.minPrice || 0, filters.maxPrice || 20000000]}
        onValueChange={([min, max]) => {
          setFilters({
            ...filters,
            minPrice: min,
            maxPrice: max
          });
          onFilterChange('price', max);
        }}
        className="mt-2"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{formatCurrency(filters.minPrice || 0)} MAD</span>
        <span>{formatCurrency(filters.maxPrice || 20000000)} MAD</span>
      </div>
    </div>
  );
};