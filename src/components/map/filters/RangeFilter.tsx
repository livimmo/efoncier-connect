import { Slider } from "@/components/ui/slider";

interface RangeFilterProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}

export const RangeFilter = ({ 
  value = [0, 100],
  onChange, 
  min = 0, 
  max = 100, 
  step = 1, 
  unit 
}: RangeFilterProps) => {
  const safeValue = Array.isArray(value) ? value : [min, max];

  return (
    <div className="space-y-2">
      <Slider
        defaultValue={safeValue}
        max={max}
        min={min}
        step={step}
        onValueChange={(value) => onChange(value as [number, number])}
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>{safeValue[0]} {unit}</span>
        <span>{safeValue[1]} {unit}</span>
      </div>
    </div>
  );
};