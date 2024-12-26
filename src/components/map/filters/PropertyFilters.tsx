import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PropertyFiltersProps } from "./types";

const PROPERTY_STATUS_OPTIONS = [
  { value: "AVAILABLE", label: "Disponible", variant: "success" as const },
  { value: "SOLD", label: "Vendu", variant: "destructive" as const },
  { value: "IN_TRANSACTION", label: "En Transaction", variant: "warning" as const },
];

const FISCAL_STATUS_OPTIONS = [
  { value: "PAID", label: "Payé", variant: "success" as const },
  { value: "PENDING", label: "En attente", variant: "warning" as const },
  { value: "OVERDUE", label: "En retard", variant: "destructive" as const },
];

export const PropertyFilters = ({ filters, setFilters, onFilterChange }: PropertyFiltersProps) => {
  const getStatusBadge = (status: string, options: typeof PROPERTY_STATUS_OPTIONS | typeof FISCAL_STATUS_OPTIONS) => {
    const option = options.find(opt => opt.value === status);
    if (!option) return null;
    
    return (
      <Badge variant={option.variant}>
        {option.label}
      </Badge>
    );
  };

  return (
    <>
      <div className="space-y-2">
        <Label>Statut du bien</Label>
        <Select
          value={filters.propertyStatus}
          onValueChange={(value) => {
            setFilters({ ...filters, propertyStatus: value });
            onFilterChange('propertyStatus', value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un statut">
              {filters.propertyStatus && getStatusBadge(filters.propertyStatus, PROPERTY_STATUS_OPTIONS)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {PROPERTY_STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value} className="flex items-center justify-between">
                {getStatusBadge(option.value, PROPERTY_STATUS_OPTIONS)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Statut fiscal</Label>
        <Select
          value={filters.fiscalStatus}
          onValueChange={(value) => {
            setFilters({ ...filters, fiscalStatus: value });
            onFilterChange('fiscalStatus', value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un statut fiscal">
              {filters.fiscalStatus && getStatusBadge(filters.fiscalStatus, FISCAL_STATUS_OPTIONS)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {FISCAL_STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value} className="flex items-center justify-between">
                {getStatusBadge(option.value, FISCAL_STATUS_OPTIONS)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Type de propriété</Label>
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
    </>
  );
};