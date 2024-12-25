import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { MapFilters } from "../types";
import { useState, useEffect } from "react";

interface SurfaceFilterProps {
  filters: MapFilters;
  onFilterChange: (filterType: string, value: string | number) => void;
  setFilters: (filters: MapFilters) => void;
}

export const SurfaceFilter = ({ filters, onFilterChange, setFilters }: SurfaceFilterProps) => {
  const [showCustomInput, setShowCustomInput] = useState(false);

  useEffect(() => {
    setShowCustomInput(filters.size[1] >= 15000);
  }, [filters.size]);

  const handleSurfaceInputChange = (value: string) => {
    const numericValue = value ? parseInt(value.replace(/[^0-9]/g, '')) : 0;
    const newSize: [number, number] = [filters.size[0], numericValue];
    setFilters({ ...filters, size: newSize });
    onFilterChange('size', newSize.join(','));
  };

  const handleSliderChange = (value: number[]) => {
    const newSize: [number, number] = [value[0], value[1]];
    setFilters({ ...filters, size: newSize });
    onFilterChange('size', newSize.join(','));
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
        <span>{filters.size[0].toLocaleString()} m²</span>
        {showCustomInput ? (
          <Input
            type="text"
            value={filters.size[1].toLocaleString()}
            onChange={(e) => handleSurfaceInputChange(e.target.value)}
            className="w-32 h-7 text-right"
            placeholder="Surface max"
          />
        ) : (
          <span>{filters.size[1].toLocaleString()} m²</span>
        )}
      </div>
    </div>
  );
};