import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TNBFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const TNBFilter = ({ value, onChange }: TNBFilterProps) => {
  return (
    <div className="space-y-2">
      <Label>Référence TNB</Label>
      <Input
        placeholder="Entrer la référence TNB"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};