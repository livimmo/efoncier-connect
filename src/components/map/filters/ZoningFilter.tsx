import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ZONING_TYPES } from "@/utils/mockData/locations";

interface ZoningFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const ZoningFilter = ({ value, onChange }: ZoningFilterProps) => {
  return (
    <div className="space-y-2">
      <Label>Zonage</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner un zonage" />
        </SelectTrigger>
        <SelectContent>
          {ZONING_TYPES.map((zone) => (
            <SelectItem key={zone.value} value={zone.value}>
              {zone.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};