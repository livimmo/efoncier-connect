import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ZONE_TYPES } from "./constants";

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
          {Object.entries(ZONE_TYPES).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};