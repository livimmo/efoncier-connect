import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { REGIONS } from "@/utils/mockData/locations";
import { useEffect, useState } from "react";

interface MapFiltersProps {
  onRegionChange?: (regionId: string) => void;
  onCityChange?: (city: string) => void;
  onDistrictChange?: (district: string) => void;
}

export const MapFilters = ({ onRegionChange, onCityChange, onDistrictChange }: MapFiltersProps) => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);

  // Mise à jour des villes quand une région est sélectionnée
  useEffect(() => {
    if (selectedRegion) {
      const region = REGIONS.find(r => r.id === selectedRegion);
      if (region) {
        setCities(region.communes);
        setSelectedCity("");
        setDistricts([]);
      }
    } else {
      setCities([]);
      setSelectedCity("");
      setDistricts([]);
    }
  }, [selectedRegion]);

  // Mise à jour des quartiers quand une ville est sélectionnée
  useEffect(() => {
    if (selectedCity) {
      // Simulons quelques quartiers pour la ville sélectionnée
      const mockDistricts = [
        `${selectedCity} Nord`,
        `${selectedCity} Sud`,
        `${selectedCity} Est`,
        `${selectedCity} Ouest`,
        `Centre ${selectedCity}`
      ];
      setDistricts(mockDistricts);
    } else {
      setDistricts([]);
    }
  }, [selectedCity]);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Filtres</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Région</Label>
          <Select 
            value={selectedRegion} 
            onValueChange={(value) => {
              setSelectedRegion(value);
              onRegionChange?.(value);
            }}
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
            value={selectedCity} 
            onValueChange={(value) => {
              setSelectedCity(value);
              onCityChange?.(value);
            }}
            disabled={!selectedRegion}
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

        <div className="space-y-2">
          <Label>Quartier</Label>
          <Select 
            onValueChange={(value) => onDistrictChange?.(value)}
            disabled={!selectedCity}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un quartier" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Superficie (m²)</Label>
          <Slider
            defaultValue={[0, 15000]}
            max={15000}
            step={100}
            className="mt-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0 m²</span>
            <span>15 000 m²</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};