import { DateFilter } from "@/components/map/filters/DateFilter";
import { SelectFilter } from "@/components/map/filters/SelectFilter";
import { FilterSection } from "@/components/map/filters/FilterSection";
import { Input } from "@/components/ui/input";
import type { NotificationFilter } from "./types";

interface NotificationFiltersProps {
  filters: NotificationFilter;
  onChange: (filters: NotificationFilter) => void;
}

export const NotificationFilters = ({ filters, onChange }: NotificationFiltersProps) => {
  const handleFilterChange = (key: keyof NotificationFilter, value: any) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-6">
      <FilterSection title="Recherche">
        <Input
          placeholder="Rechercher..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
      </FilterSection>

      <FilterSection title="Type">
        <SelectFilter
          value={filters.type}
          onChange={(value) => handleFilterChange("type", value)}
          options={[
            { value: "all", label: "Tous" },
            { value: "payment", label: "Paiements" },
            { value: "property", label: "Biens" },
            { value: "message", label: "Messages" },
            { value: "document", label: "Documents" },
          ]}
          placeholder="Sélectionner un type"
        />
      </FilterSection>

      <FilterSection title="Statut">
        <SelectFilter
          value={filters.status}
          onChange={(value) => handleFilterChange("status", value)}
          options={[
            { value: "all", label: "Tous" },
            { value: "unread", label: "Non lus" },
            { value: "read", label: "Lus" },
          ]}
          placeholder="Sélectionner un statut"
        />
      </FilterSection>

      <FilterSection title="Date">
        <DateFilter
          value={filters.date}
          onChange={(date) => handleFilterChange("date", date)}
        />
      </FilterSection>
    </div>
  );
};