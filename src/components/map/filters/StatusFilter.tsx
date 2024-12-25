import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const StatusFilter = ({ value, onChange }: StatusFilterProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PAID':
        return <Badge variant="secondary" className="bg-green-500/10 text-green-500">Payé</Badge>;
      case 'OVERDUE':
        return <Badge variant="secondary" className="bg-red-500/10 text-red-500">En retard</Badge>;
      case 'PENDING':
        return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">En attente</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <Label>Statut de paiement</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner un statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PAID">
            {getStatusBadge('PAID')} Payé
          </SelectItem>
          <SelectItem value="OVERDUE">
            {getStatusBadge('OVERDUE')} En retard
          </SelectItem>
          <SelectItem value="PENDING">
            {getStatusBadge('PENDING')} En attente
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};