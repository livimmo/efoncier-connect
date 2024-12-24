import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Filter } from "lucide-react";
import { MapFilters as MapFiltersType } from "./types";
import { PropertyType, ZoneType } from "@/utils/mockData/types";
import { REGIONS } from "@/utils/mockData/locations";
import { useMemo } from "react";
import { SearchField } from "./filters/SearchField";
import { FilterSection } from "./filters/FilterSection";

interface MapFiltersProps {
  filters: MapFiltersType;
  setFilters: (filters: MapFiltersType) => void;
  onApplyFilters: () => void;
}

const PROPERTY_TYPES: { [key in PropertyType]: string } = {
  RESIDENTIAL: "Résidentiel",
  COMMERCIAL: "Commercial",
  INDUSTRIAL: "Industriel",
  AGRICULTURAL: "Agricole",
  MIXED: "Mixte",
  SEASIDE: "Balnéaire"
};

const ZONE_TYPES: { [key in ZoneType]: string } = {
  URBAN: "Urbaine",
  SUBURBAN: "Périurbaine",
  RURAL: "Rurale",
  E3: "Zone E3",
  E4: "Zone E4",
  I2S12: "Zone I2S12",
  BT2: "Zone BT2",
  PROTECTED: "Zone protégée",
  CONSTRUCTIBLE: "Zone constructible"
};

export const MapFilters = ({ filters, setFilters, onApplyFilters }: MapFiltersProps) => {
  const availableCommunes = useMemo(() => {
    if (!filters.region) return [];
    const region = REGIONS.find(r => r.id === filters.region);
    return region ? region.communes : [];
  }, [filters.region]);

  return (
    <div className="w-80 bg-white p-6 shadow-lg space-y-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filtres</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setFilters({
            region: '',
            commune: '',
            propertyType: '',
            zoneType: '',
            size: [0, 15000],
            status: '',
            ownerName: '',
            titleDeedNumber: '',
          })}
        >
          Réinitialiser
        </Button>
      </div>
      
      <div className="space-y-4">
        <FilterSection title="Propriétaire">
          <SearchField
            value={filters.ownerName}
            onChange={(value) => setFilters({ ...filters, ownerName: value })}
            type="owner"
            placeholder="Nom du propriétaire"
          />
        </FilterSection>

        <FilterSection title="Titre Foncier">
          <SearchField
            value={filters.titleDeedNumber}
            onChange={(value) => setFilters({ ...filters, titleDeedNumber: value })}
            type="title"
            placeholder="Numéro du titre foncier"
          />
        </FilterSection>

        <FilterSection title="Région">
          <Select
            value={filters.region}
            onValueChange={(value) => setFilters({ ...filters, region: value, commune: '' })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une région" />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((region) => (
                <SelectItem key={region.id} value={region.id}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterSection>

        <FilterSection title="Commune">
          <Select
            value={filters.commune}
            onValueChange={(value) => setFilters({ ...filters, commune: value })}
            disabled={!filters.region}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une commune" />
            </SelectTrigger>
            <SelectContent>
              {availableCommunes.map((commune) => (
                <SelectItem key={commune.toLowerCase()} value={commune.toLowerCase()}>
                  {commune}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterSection>

        <FilterSection title="Type de Terrain">
          <Select
            value={filters.propertyType}
            onValueChange={(value) => setFilters({ ...filters, propertyType: value as PropertyType })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type de terrain" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(PROPERTY_TYPES).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterSection>

        <FilterSection title="Zoning">
          <Select
            value={filters.zoneType}
            onValueChange={(value) => setFilters({ ...filters, zoneType: value as ZoneType })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Zoning" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(ZONE_TYPES).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterSection>

        <FilterSection title="Statut Fiscal">
          <Select
            value={filters.status}
            onValueChange={(value) => setFilters({ ...filters, status: value as 'PAID' | 'PENDING' | 'OVERDUE' | '' })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Statut fiscal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PAID">Payé</SelectItem>
              <SelectItem value="PENDING">En attente</SelectItem>
              <SelectItem value="OVERDUE">En retard</SelectItem>
            </SelectContent>
          </Select>
        </FilterSection>

        <FilterSection title="Superficie (m²)">
          <Slider
            defaultValue={[0, 15000]}
            max={15000}
            step={100}
            onValueChange={(value) => setFilters({ ...filters, size: value as [number, number] })}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{filters.size[0]} m²</span>
            <span>{filters.size[1]} m²</span>
          </div>
        </FilterSection>

        <Button 
          className="w-full"
          onClick={onApplyFilters}
        >
          <Filter className="w-4 h-4 mr-2" />
          Appliquer les filtres
        </Button>
      </div>
    </div>
  );
};