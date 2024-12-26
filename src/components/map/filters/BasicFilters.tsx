import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { REGIONS, ZONING_TYPES } from "@/utils/mockData/locations";
import { MapFilters } from "../types";
import { useState } from "react";

interface BasicFiltersProps {
  filters: MapFilters;
  onRegionChange: (value: string) => void;
  onCityChange: (value: string) => void;
  setFilters: (filters: MapFilters) => void;
}

export const BasicFilters = ({ 
  filters, 
  onRegionChange, 
  onCityChange, 
  setFilters 
}: BasicFiltersProps) => {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedCommunes, setSelectedCommunes] = useState<string[]>([]);

  const handleRegionChange = (regionId: string) => {
    const region = REGIONS.find(r => r.id === regionId);
    if (region) {
      setSelectedCities(region.cities.map(city => city.name));
      setSelectedCommunes([]);
    }
    onRegionChange(regionId);
    setFilters({ ...filters, region: regionId, commune: '', city: '' });
  };

  const handleCityChange = (cityName: string) => {
    const region = REGIONS.find(r => r.id === filters.region);
    const city = region?.cities.find(c => c.name === cityName);
    if (city) {
      setSelectedCommunes(city.communes);
    }
    onCityChange(cityName);
    setFilters({ ...filters, city: cityName, commune: '' });
  };

  return (
    <>
      <div className="space-y-2">
        <Label>Région</Label>
        <Select 
          value={filters.region} 
          onValueChange={handleRegionChange}
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
      </div>

      <div className="space-y-2">
        <Label>Ville</Label>
        <Select
          value={filters.city}
          onValueChange={handleCityChange}
          disabled={!filters.region}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une ville" />
          </SelectTrigger>
          <SelectContent>
            {selectedCities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Commune</Label>
        <Select
          value={filters.commune}
          onValueChange={(value) => setFilters({ ...filters, commune: value })}
          disabled={!filters.city}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une commune" />
          </SelectTrigger>
          <SelectContent>
            {selectedCommunes.map((commune) => (
              <SelectItem key={commune} value={commune}>
                {commune}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Zonage</Label>
        <Select
          value={filters.zoning}
          onValueChange={(value) => setFilters({ ...filters, zoning: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un zonage" />
          </SelectTrigger>
          <SelectContent>
            {ZONING_TYPES.map((zone) => (
              <SelectItem key={zone.value} value={zone.value}>
                {zone.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};