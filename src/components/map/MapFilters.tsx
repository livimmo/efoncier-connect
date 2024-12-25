import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { MapFilters as MapFiltersType } from "./types";
import { SearchField } from "./filters/SearchField";
import { FilterSection } from "./filters/FilterSection";
import { SelectFilter } from "./filters/SelectFilter";
import { RangeFilter } from "./filters/RangeFilter";
import { DateFilter } from "./filters/DateFilter";
import { useFilterOptions } from "./filters/useFilterOptions";
import { REGIONS } from "@/utils/mockData/locations";
import { Badge } from "@/components/ui/badge";
import { PropertyType, ZoneType } from "@/utils/mockData/types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MapFiltersProps {
  filters: MapFiltersType;
  setFilters: (filters: MapFiltersType) => void;
  onApplyFilters: () => void;
}

export const MapFilters = ({ filters, setFilters, onApplyFilters }: MapFiltersProps) => {
  const { 
    propertyTypeOptions, 
    zoneTypeOptions, 
    availableCommunes, 
    statusOptions,
    statusCounts 
  } = useFilterOptions(filters.region);

  const handleStatusChange = (value: string) => {
    setFilters({ 
      ...filters, 
      status: value === "ALL" ? "" : value as "PAID" | "PENDING" | "OVERDUE" | "" 
    });
  };

  const resetFilters = () => {
    setFilters({
      region: '',
      commune: '',
      propertyType: '',
      zoneType: '',
      size: [0, 15000],
      status: '',
      ownerName: '',
      titleDeedNumber: '',
      lastPaymentDate: null
    });
  };

  return (
    <div className="w-80 bg-white h-full flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filtres</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
          >
            Réinitialiser
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 px-6 py-4">
        <div className="space-y-6">
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
            <SelectFilter
              value={filters.region}
              onChange={(value) => setFilters({ ...filters, region: value, commune: '' })}
              options={[
                { value: "ALL", label: "Toutes les régions" },
                ...REGIONS.map((region) => ({
                  value: region.id,
                  label: region.name
                }))
              ]}
              placeholder="Sélectionner une région"
            />
          </FilterSection>

          <FilterSection title="Commune">
            <SelectFilter
              value={filters.commune}
              onChange={(value) => setFilters({ ...filters, commune: value })}
              options={[
                { value: "ALL", label: "Toutes les communes" },
                ...availableCommunes.map((commune) => ({
                  value: commune.toLowerCase(),
                  label: commune
                }))
              ]}
              placeholder="Sélectionner une commune"
            />
          </FilterSection>

          <FilterSection title="Type de Terrain">
            <SelectFilter
              value={filters.propertyType}
              onChange={(value) => setFilters({ ...filters, propertyType: value === "ALL" ? "" : value as PropertyType })}
              options={[
                { value: "ALL", label: "Tous les types" },
                ...propertyTypeOptions
              ]}
              placeholder="Type de terrain"
            />
          </FilterSection>

          <FilterSection title="Zoning">
            <SelectFilter
              value={filters.zoneType}
              onChange={(value) => setFilters({ ...filters, zoneType: value === "ALL" ? "" : value as ZoneType })}
              options={[
                { value: "ALL", label: "Tous les zonings" },
                ...zoneTypeOptions
              ]}
              placeholder="Zoning"
            />
          </FilterSection>

          <FilterSection 
            title={
              <div className="flex items-center gap-2">
                Statut Fiscal
                <div className="flex gap-1">
                  <Badge variant="success">{statusCounts.PAID}</Badge>
                  <Badge variant="warning">{statusCounts.PENDING}</Badge>
                  <Badge variant="destructive">{statusCounts.OVERDUE}</Badge>
                </div>
              </div>
            }
          >
            <SelectFilter
              value={filters.status || "ALL"}
              onChange={handleStatusChange}
              options={statusOptions}
              placeholder="Statut fiscal"
            />
          </FilterSection>

          <FilterSection title="Dernière Date de Paiement">
            <DateFilter
              value={filters.lastPaymentDate}
              onChange={(value) => setFilters({ ...filters, lastPaymentDate: value })}
            />
          </FilterSection>

          <FilterSection title="Superficie (m²)">
            <RangeFilter
              value={filters.size}
              onChange={(value) => setFilters({ ...filters, size: value })}
              min={0}
              max={15000}
              step={100}
              unit="m²"
            />
          </FilterSection>

          <Button 
            className="w-full mt-6"
            onClick={onApplyFilters}
          >
            <Filter className="w-4 h-4 mr-2" />
            Appliquer les filtres
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};