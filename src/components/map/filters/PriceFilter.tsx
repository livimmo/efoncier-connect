import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { MapFilters } from "../types";
import { formatCurrency } from "@/utils/format";
import { useState } from "react";

interface PriceFilterProps {
  filters: MapFilters;
  onFilterChange: (filterType: string, value: number) => void;
  setFilters: (filters: MapFilters) => void;
}

export const PriceFilter = ({ filters, onFilterChange, setFilters }: PriceFilterProps) => {
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handlePriceInputChange = (value: string) => {
    const numericValue = value ? parseInt(value.replace(/[^0-9]/g, '')) : 0;
    setFilters({
      ...filters,
      minPrice: filters.minPrice,
      maxPrice: numericValue
    });
    onFilterChange('price', numericValue);
  };

  const handleSliderChange = ([min, max]: number[]) => {
    setFilters({
      ...filters,
      minPrice: min,
      maxPrice: max
    });
    onFilterChange('price', max);
    setShowCustomInput(max >= 20000000);
  };

  return (
    <div className="space-y-4">
      <Label>Prix (MAD)</Label>
      <Slider
        min={0}
        max={20000000}
        step={100000}
        value={[filters.minPrice || 0, Math.min(filters.maxPrice || 20000000, 20000000)]}
        onValueChange={handleSliderChange}
        className="mt-2"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{formatCurrency(filters.minPrice || 0)} MAD</span>
        {showCustomInput ? (
          <Input
            type="text"
            value={filters.maxPrice?.toLocaleString()}
            onChange={(e) => handlePriceInputChange(e.target.value)}
            className="w-32 h-7 text-right"
            placeholder="Prix max"
          />
        ) : (
          <span>{formatCurrency(filters.maxPrice || 20000000)} MAD</span>
        )}
      </div>
    </div>
  );
};