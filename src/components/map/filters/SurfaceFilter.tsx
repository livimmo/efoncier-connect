import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { MapFilters } from "../types";
import { useState } from "react";

interface SurfaceFilterProps {
  filters: MapFilters;
  onFilterChange: (filterType: string, value: string) => void;
  setFilters: (filters: MapFilters) => void;
}

export const SurfaceFilter = ({ filters, onFilterChange, setFilters }: SurfaceFilterProps) => {
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleSurfaceInputChange = (value: string) => {
    const numericValue = value ? parseInt(value.replace(/[^0-9]/g, '')) : 0;
    const newSize: [number, number] = [filters.size[0], numericValue];
    setFilters({ ...filters, size: newSize });
    onFilterChange('size', newSize.join(','));
  };

  const handleSliderChange = (value: number[]) => {
    setFilters({ ...filters, size: value as [number, number] });
    onFilterChange('size', value.join(','));
    setShowCustomInput(value[1] >= 15000);
  };

  return (
    <div className="space-y-4">
      <Label>Superficie (m²)</Label>
      <Slider
        min={0}
        max={15000}
        step={100}
        value={[filters.size[0], Math.min(filters.size[1], 15000)]}
        onValueChange={handleSliderChange}
        className="mt-2"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{filters.size[0]} m²</span>
        {showCustomInput ? (
          <Input
            type="text"
            value={filters.size[1].toLocaleString()}
            onChange={(e) => handleSurfaceInputChange(e.target.value)}
            className="w-32 h-7 text-right"
            placeholder="Surface max"
          />
        ) : (
          <span>{filters.size[1]} m²</span>
        )}
      </div>
    </div>
  );
};