import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REGIONS } from "@/utils/mockData/locations";

interface DirectoryFiltersProps {
  filters: {
    type: string;
    status: string;
    region: string;
    commune: string;
  };
  onChange: (filters: any) => void;
}

export function DirectoryFilters({ filters, onChange }: DirectoryFiltersProps) {
  const availableCommunes = filters.region 
    ? REGIONS.find(r => r.id === filters.region)?.communes || []
    : [];

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
        value={filters.region}
        onValueChange={(value) => onChange({ ...filters, region: value, commune: '' })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Région" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les régions</SelectItem>
          {REGIONS.map((region) => (
            <SelectItem key={region.id} value={region.id}>
              {region.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.commune}
        onValueChange={(value) => onChange({ ...filters, commune: value })}
        disabled={!filters.region || filters.region === 'all'}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Commune" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les communes</SelectItem>
          {availableCommunes.map((commune) => (
            <SelectItem key={commune} value={commune.toLowerCase()}>
              {commune}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={() =>
          onChange({ type: "all", status: "all", region: "all", commune: "all" })
        }
      >
        Réinitialiser les filtres
      </Button>
    </div>
  );
}