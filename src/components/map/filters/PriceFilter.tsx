import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { MapFilters } from "../types";
import { formatCurrency } from "@/utils/format";
import { useState, useEffect } from "react";

interface PriceFilterProps {
  filters: MapFilters;
  onFilterChange: (filterType: string, value: string | number) => void;
  setFilters: (filters: MapFilters) => void;
}

export const PriceFilter = ({ filters, onFilterChange, setFilters }: PriceFilterProps) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [minPrice, setMinPrice] = useState(filters.minPrice || 0);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || 20000000);

  useEffect(() => {
    setShowCustomInput(maxPrice >= 20000000);
  }, [maxPrice]);

  const handleMinPriceInputChange = (value: string) => {
    const numericValue = value ? parseInt(value.replace(/[^0-9]/g, '')) : 0;
    setMinPrice(numericValue);
    setFilters({
      ...filters,
      minPrice: numericValue,
      maxPrice: maxPrice
    });
    onFilterChange('minPrice', numericValue);
  };

  const handleMaxPriceInputChange = (value: string) => {
    const numericValue = value ? parseInt(value.replace(/[^0-9]/g, '')) : 0;
    setMaxPrice(numericValue);
    setFilters({
      ...filters,
      minPrice: minPrice,
      maxPrice: numericValue
    });
    onFilterChange('maxPrice', numericValue);
  };

  const handleSliderChange = (value: number[]) => {
    const [min, max] = value;
    setMinPrice(min);
    setMaxPrice(max);
    setFilters({
      ...filters,
      minPrice: min,
      maxPrice: max
    });
    onFilterChange('price', `${min},${max}`);
    setShowCustomInput(max >= 20000000);
  };

  return (
    <div className="space-y-4">
      <Label>Prix (MAD)</Label>
      <Slider
        min={0}
        max={20000000}
        step={100000}
        value={[minPrice, Math.min(maxPrice, 20000000)]}
        onValueChange={handleSliderChange}
        className="mt-2"
      />
      <div className="flex justify-between gap-2">
        <Input
          type="text"
          value={minPrice.toLocaleString()}
          onChange={(e) => handleMinPriceInputChange(e.target.value)}
          className="w-32 h-8 text-right"
          placeholder="Prix min"
        />
        {showCustomInput ? (
          <Input
            type="text"
            value={maxPrice.toLocaleString()}
            onChange={(e) => handleMaxPriceInputChange(e.target.value)}
            className="w-32 h-8 text-right"
            placeholder="Prix max"
          />
        ) : (
          <Input
            type="text"
            value={maxPrice.toLocaleString()}
            onChange={(e) => handleMaxPriceInputChange(e.target.value)}
            className="w-32 h-8 text-right"
            placeholder="Prix max"
          />
        )}
      </div>
    </div>
  );
};