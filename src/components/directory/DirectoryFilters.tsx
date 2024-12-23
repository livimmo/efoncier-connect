import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DirectoryFiltersProps {
  filters: {
    type: string;
    status: string;
    location: string;
  };
  onChange: (filters: any) => void;
}

export function DirectoryFilters({ filters, onChange }: DirectoryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <Select
        value={filters.type}
        onValueChange={(value) => onChange({ ...filters, type: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type de profil" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les profils</SelectItem>
          <SelectItem value="taxpayer">Contribuable</SelectItem>
          <SelectItem value="developer">Promoteur</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.status}
        onValueChange={(value) => onChange({ ...filters, status: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Statut fiscal" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          <SelectItem value="regular">À jour</SelectItem>
          <SelectItem value="late">En retard</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.location}
        onValueChange={(value) => onChange({ ...filters, location: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Localisation" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les villes</SelectItem>
          <SelectItem value="casablanca">Casablanca</SelectItem>
          <SelectItem value="rabat">Rabat</SelectItem>
          <SelectItem value="tanger">Tanger</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={() =>
          onChange({ type: "all", status: "all", location: "all" })
        }
      >
        Réinitialiser les filtres
      </Button>
    </div>
  );
}