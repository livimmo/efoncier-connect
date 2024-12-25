import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapFilters } from "../types";

interface ListViewFiltersProps {
  filters: MapFilters;
  setFilters: (filters: MapFilters) => void;
  onFilterChange: (filterType: string, value: string) => void;
}

export const ListViewFilters = ({ filters, setFilters, onFilterChange }: ListViewFiltersProps) => {
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
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Type de bien</Label>
        <Select
          value={filters.propertyType}
          onValueChange={(value) => {
            setFilters({ ...filters, propertyType: value });
            onFilterChange('propertyType', value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="RESIDENTIAL">Résidentiel</SelectItem>
            <SelectItem value="COMMERCIAL">Commercial</SelectItem>
            <SelectItem value="INDUSTRIAL">Industriel</SelectItem>
            <SelectItem value="AGRICULTURAL">Agricole</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Statut de paiement</Label>
        <Select
          value={filters.paymentStatus}
          onValueChange={(value) => {
            setFilters({ ...filters, paymentStatus: value });
            onFilterChange('paymentStatus', value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un statut">
              {filters.paymentStatus && getStatusBadge(filters.paymentStatus)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PAID">
              {getStatusBadge('PAID')}
            </SelectItem>
            <SelectItem value="OVERDUE">
              {getStatusBadge('OVERDUE')}
            </SelectItem>
            <SelectItem value="PENDING">
              {getStatusBadge('PENDING')}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};