import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapFilters } from "../types";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle, X } from "lucide-react";

interface StatusFilterProps {
  filters: MapFilters;
  setFilters: (filters: MapFilters) => void;
  onFilterChange: (filterType: string, value: string) => void;
}

export const StatusFilter = ({
  filters,
  setFilters,
  onFilterChange,
}: StatusFilterProps) => {
  return (
    <div className="space-y-2">
      <Label>Statut du bien</Label>
      <Select
        value={filters.status}
        onValueChange={(value) => {
          setFilters({ ...filters, status: value });
          onFilterChange('status', value);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner un statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AVAILABLE">
            <div className="flex items-center">
              <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                <Check className="w-3 h-3 mr-1" />
                Disponible
              </Badge>
            </div>
          </SelectItem>
          <SelectItem value="IN_TRANSACTION">
            <div className="flex items-center">
              <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">
                <AlertTriangle className="w-3 h-3 mr-1" />
                En Transaction
              </Badge>
            </div>
          </SelectItem>
          <SelectItem value="SOLD">
            <div className="flex items-center">
              <Badge variant="secondary" className="bg-red-500/10 text-red-500">
                <X className="w-3 h-3 mr-1" />
                Vendu
              </Badge>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};