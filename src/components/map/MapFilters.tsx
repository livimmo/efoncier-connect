import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { Filter } from "lucide-react";
import { MapFilters as MapFiltersType } from "./types";
import { PropertyType, ZoneType } from "@/utils/mockData/types";

interface MapFiltersProps {
  filters: MapFiltersType;
  setFilters: (filters: MapFiltersType) => void;
  onApplyFilters: () => void;
}

const CITIES = ["Tanger", "Agadir", "Marrakech", "Beni Mellal", "Meknes"];

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
  return (
    <div className="w-80 bg-white p-6 shadow-lg space-y-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filtres</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setFilters({
            city: '',
            propertyType: '',
            zoneType: '',
            size: [0, 15000],
            status: '',
          })}
        >
          Réinitialiser
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Ville</label>
          <Select
            value={filters.city}
            onValueChange={(value) => setFilters({ ...filters, city: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une ville" />
            </SelectTrigger>
            <SelectContent>
              {CITIES.map((city) => (
                <SelectItem key={city.toLowerCase()} value={city.toLowerCase()}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Type de Terrain</label>
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
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Zoning</label>
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
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Statut Fiscal</label>
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
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Superficie (m²)</label>
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
        </div>

        <Button 
          className="w-full"
          onClick={onApplyFilters}
        >
          Appliquer les filtres
        </Button>
      </div>
    </div>
  );
};