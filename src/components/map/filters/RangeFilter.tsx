import { Slider } from "@/components/ui/slider";
import { RangeFilterProps } from "./types";

export const RangeFilter = ({ value, onChange, min, max, step, unit }: RangeFilterProps) => {
  return (
    <div className="space-y-2">
      <Slider
        defaultValue={value}
        max={max}
        min={min}
        step={step}
        onValueChange={(value) => onChange(value as [number, number])}
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>{value[0]} {unit}</span>
        <span>{value[1]} {unit}</span>
      </div>
    </div>
  );
};