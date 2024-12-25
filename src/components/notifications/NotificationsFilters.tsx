import { DateFilter } from "@/components/map/filters/DateFilter";
import { SelectFilter } from "@/components/map/filters/SelectFilter";
import { FilterSection } from "@/components/map/filters/FilterSection";
import { Input } from "@/components/ui/input";
import type { NotificationFilter } from "@/types/notifications";

interface NotificationsFiltersProps {
  filters: NotificationFilter;
  onChange: (filters: NotificationFilter) => void;
}

export const NotificationsFilters = ({ filters, onChange }: NotificationsFiltersProps) => {
  const handleFilterChange = (key: keyof NotificationFilter, value: any) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-6">
      <FilterSection title="Recherche">
        <Input
          placeholder="Rechercher par mot-clé..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
      </FilterSection>

      <FilterSection title="Type">
        <SelectFilter
          value={filters.type}
          onChange={(value) => handleFilterChange("type", value)}
          options={[
            { value: "all", label: "Tous les types" },
            { value: "PAYMENT", label: "💳 Paiements" },
            { value: "DOCUMENT", label: "📑 Documents" },
            { value: "MESSAGE", label: "💬 Messages" },
            { value: "STATUS", label: "📊 Statuts" },
          ]}
          placeholder="Sélectionner un type"
        />
      </FilterSection>

      <FilterSection title="Priorité">
        <SelectFilter
          value={filters.priority}
          onChange={(value) => handleFilterChange("priority", value)}
          options={[
            { value: "all", label: "Toutes les priorités" },
            { value: "HIGH", label: "⚠️ Urgent" },
            { value: "MEDIUM", label: "📢 Important" },
            { value: "LOW", label: "ℹ️ Information" },
          ]}
          placeholder="Sélectionner une priorité"
        />
      </FilterSection>

      <FilterSection title="Statut">
        <SelectFilter
          value={filters.status}
          onChange={(value) => handleFilterChange("status", value)}
          options={[
            { value: "all", label: "Tous les statuts" },
            { value: "unread", label: "🔴 Non lu" },
            { value: "read", label: "✅ Lu" },
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