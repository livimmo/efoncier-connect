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
  const [minSurface, setMinSurface] = useState(filters.size[0]);
  const [maxSurface, setMaxSurface] = useState(filters.size[1]);

  useEffect(() => {
    setShowCustomInput(maxSurface >= 15000);
  }, [maxSurface]);

  const handleMinSurfaceInputChange = (value: string) => {
    const numericValue = value ? parseInt(value.replace(/[^0-9]/g, '')) : 0;
    setMinSurface(numericValue);
    const newSize: [number, number] = [numericValue, maxSurface];
    setFilters({ ...filters, size: newSize });
    onFilterChange('size', newSize.join(','));
  };

  const handleMaxSurfaceInputChange = (value: string) => {
    const numericValue = value ? parseInt(value.replace(/[^0-9]/g, '')) : 0;
    setMaxSurface(numericValue);
    const newSize: [number, number] = [minSurface, numericValue];
    setFilters({ ...filters, size: newSize });
    onFilterChange('size', newSize.join(','));
  };

  const handleSliderChange = (value: number[]) => {
    const [min, max] = value;
    setMinSurface(min);
    setMaxSurface(max);
    const newSize: [number, number] = [min, max];
    setFilters({ ...filters, size: newSize });
    onFilterChange('size', newSize.join(','));
    setShowCustomInput(max >= 15000);
  };

  return (
    <div className="space-y-4">
      <Label>Superficie (m²)</Label>
      <Slider
        min={0}
        max={15000}
        step={100}
        value={[minSurface, Math.min(maxSurface, 15000)]}
        onValueChange={handleSliderChange}
        className="mt-2"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <Input
          type="text"
          value={minSurface.toLocaleString()}
          onChange={(e) => handleMinSurfaceInputChange(e.target.value)}
          className="w-32 h-7 text-right"
          placeholder="Surface min"
        />
        {showCustomInput ? (
          <Input
            type="text"
            value={maxSurface.toLocaleString()}
            onChange={(e) => handleMaxSurfaceInputChange(e.target.value)}
            className="w-32 h-7 text-right"
            placeholder="Surface max"
          />
        ) : (
          <span>{maxSurface.toLocaleString()} m²</span>
        )}
      </div>
    </div>
  );
};