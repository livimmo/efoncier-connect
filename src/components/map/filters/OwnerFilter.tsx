import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OwnerFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const OwnerFilter = ({ value, onChange }: OwnerFilterProps) => {
  return (
    <div className="space-y-2">
      <Label>Propriétaire</Label>
      <Input
        placeholder="Nom du propriétaire"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};