import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PropertyStatusIndicator } from "./PropertyStatusIndicator";

interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const StatusFilter = ({ value, onChange }: StatusFilterProps) => {
  const statuses = [
    { value: 'AVAILABLE', label: 'Disponible' },
    { value: 'IN_TRANSACTION', label: 'En Transaction' },
    { value: 'SOLD', label: 'Vendu' }
  ];

  return (
    <div className="space-y-2">
      <Label>Statut du Bien</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner un statut">
            {value && <PropertyStatusIndicator status={value} size="sm" />}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              <PropertyStatusIndicator status={status.value} size="sm" />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};