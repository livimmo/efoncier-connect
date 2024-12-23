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
import { MapFilters as MapFiltersType } from "@/utils/mockData/types";
import { Dispatch, SetStateAction } from "react";

interface MapFiltersProps {
  filters: MapFiltersType;
  setFilters: Dispatch<SetStateAction<MapFiltersType>>;
  onApplyFilters: () => void;
}

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
            district: '',
            propertyType: '',
            zoneType: '',
            size: [0, 15000],
            status: '',
            taxStatus: '',
            priceRange: [0, 5000000],
            titleDeedNumber: '',
            owner: ''
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
              <SelectItem value="casablanca">Casablanca</SelectItem>
              <SelectItem value="rabat">Rabat</SelectItem>
              <SelectItem value="tanger">Tanger</SelectItem>
              <SelectItem value="benslimane">Benslimane</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Type de Terrain</label>
          <Select
            value={filters.propertyType}
            onValueChange={(value) => setFilters({ ...filters, propertyType: value as any })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type de terrain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INDUSTRIAL">Industriel</SelectItem>
              <SelectItem value="RESIDENTIAL">Résidentiel</SelectItem>
              <SelectItem value="SEASIDE">Balnéaire</SelectItem>
              <SelectItem value="AGRICULTURAL">Agricole</SelectItem>
              <SelectItem value="COMMERCIAL">Commercial</SelectItem>
              <SelectItem value="MIXED">Mixte</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Zoning</label>
          <Select
            value={filters.zoneType}
            onValueChange={(value) => setFilters({ ...filters, zoneType: value as any })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Zoning" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="E4">E4</SelectItem>
              <SelectItem value="E3">E3</SelectItem>
              <SelectItem value="BT2">BT2</SelectItem>
              <SelectItem value="I2S12">I2S12</SelectItem>
              <SelectItem value="PROTECTED">Zone protégée</SelectItem>
              <SelectItem value="CONSTRUCTIBLE">Zone constructible</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Statut Fiscal</label>
          <Select
            value={filters.status}
            onValueChange={(value) => setFilters({ ...filters, status: value as any })}
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