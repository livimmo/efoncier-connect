import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { REGIONS } from "@/utils/mockData/locations";

interface LocationFilterProps {
  region: string;
  city: string;
  onRegionChange: (value: string) => void;
  onCityChange: (value: string) => void;
}

export const LocationFilter = ({
  region,
  city,
  onRegionChange,
  onCityChange
}: LocationFilterProps) => {
  const selectedRegion = REGIONS.find(r => r.id === region);
  const cities = selectedRegion?.communes || [];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Région</Label>
        <Select value={region} onValueChange={onRegionChange}>
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
          value={city} 
          onValueChange={onCityChange}
          disabled={!region}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une ville" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};