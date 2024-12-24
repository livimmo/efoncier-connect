import { FilterSection } from './filters/FilterSection';
import { SelectFilter } from './filters/SelectFilter';
import { RangeFilter } from './filters/RangeFilter';
import { SearchField } from './filters/SearchField';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapFilters as MapFiltersType } from './types';
import { PropertyStatus } from '@/utils/mockData/types';

interface MapFiltersProps {
  filters: MapFiltersType;
  setFilters: (filters: MapFiltersType) => void;
  onApplyFilters: () => void;
  className?: string;
}

export const MapFilters = ({ filters, setFilters, onApplyFilters, className }: MapFiltersProps) => {
  const propertyStatusOptions = [
    { value: 'ALL', label: 'Tous les statuts' },
    { value: 'AVAILABLE', label: '🟢 À Vendre' },
    { value: 'SOLD', label: '🔴 Vendu' },
    { value: 'UNAVAILABLE', label: '🟡 Indisponible' },
  ];

  const handleReset = () => {
    setFilters({
      region: '',
      commune: '',
      propertyType: '',
      zoneType: '',
      size: [0, 15000],
      status: '',
      ownerName: '',
      titleDeedNumber: '',
      lastPaymentDate: null,
      propertyStatus: '', // Reset property status
    });
  };

  return (
    <div className={className}>
      <div className="space-y-6 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Filtres</h3>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Réinitialiser
          </Button>
        </div>

        <FilterSection title="Statut du Bien">
          <SelectFilter
            value={filters.propertyStatus || 'ALL'}
            onChange={(value) => setFilters({ ...filters, propertyStatus: value === 'ALL' ? '' : value as PropertyStatus })}
            options={propertyStatusOptions}
            placeholder="Sélectionner un statut"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {propertyStatusOptions.slice(1).map((option) => (
              <Badge
                key={option.value}
                variant={filters.propertyStatus === option.value ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setFilters({ ...filters, propertyStatus: option.value as PropertyStatus | '' })}
              >
                {option.label}
              </Badge>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Localisation">
          <SearchField
            value={filters.ownerName}
            onChange={(value) => setFilters({ ...filters, ownerName: value })}
            placeholder="Rechercher par nom de propriétaire"
            type="owner"
          />
        </FilterSection>

        <FilterSection title="Superficie">
          <RangeFilter
            value={filters.size}
            onChange={(value) => setFilters({ ...filters, size: value })}
            min={0}
            max={15000}
            step={100}
            unit="m²"
          />
        </FilterSection>

        <Button className="w-full" onClick={onApplyFilters}>
          Appliquer les filtres
        </Button>
      </div>
    </div>
  );
};