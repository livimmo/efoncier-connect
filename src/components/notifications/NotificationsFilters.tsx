import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import type { NotificationFilter } from "@/types/notifications";

interface NotificationsFiltersProps {
  filters: NotificationFilter;
  onChange: (filters: NotificationFilter) => void;
}

export const NotificationsFilters = ({
  filters,
  onChange,
}: NotificationsFiltersProps) => {
  const handleFilterChange = (key: keyof NotificationFilter, value: any) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Recherche</Label>
        <Input
          placeholder="Rechercher par mot-clé..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Type de notification</Label>
        <Select
          value={filters.type}
          onValueChange={(value) => handleFilterChange("type", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les notifications</SelectItem>
            <SelectItem value="payment">💳 Paiements TNB</SelectItem>
            <SelectItem value="fiscal_status">🛡️ Statut Fiscal</SelectItem>
            <SelectItem value="message">💬 Messages</SelectItem>
            <SelectItem value="document">📁 Documents</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Statut</Label>
        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="unread">Non lu</SelectItem>
            <SelectItem value="read">Lu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Numéro TF</Label>
        <Input
          placeholder="Ex: TF-12345"
          value={filters.titleDeedNumber}
          onChange={(e) => handleFilterChange("titleDeedNumber", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Date</Label>
        <DatePicker
          date={filters.date ? new Date(filters.date) : null}
          onChange={(date) => handleFilterChange("date", date?.toISOString() ?? null)}
        />
      </div>
    </div>
  );
};