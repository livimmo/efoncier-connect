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
          placeholder="Rechercher par TF, ville, propriétaire..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
      </FilterSection>

      <FilterSection title="Catégorie">
        <SelectFilter
          value={filters.type}
          onChange={(value) => handleFilterChange("type", value)}
          options={[
            { value: "all", label: "Toutes les catégories" },
            { value: "new_property", label: "🆕 Nouveaux biens" },
            { value: "property_update", label: "📊 Mises à jour" },
            { value: "message", label: "💬 Messages" },
            { value: "document", label: "📁 Documents" },
          ]}
          placeholder="Sélectionner une catégorie"
        />
      </FilterSection>

      <FilterSection title="Localisation">
        <SelectFilter
          value={filters.location}
          onChange={(value) => handleFilterChange("location", value)}
          options={[
            { value: "all", label: "Toutes les zones" },
            { value: "casablanca", label: "Casablanca" },
            { value: "rabat", label: "Rabat" },
            { value: "tanger", label: "Tanger" },
            { value: "marrakech", label: "Marrakech" },
          ]}
          placeholder="Sélectionner une zone"
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