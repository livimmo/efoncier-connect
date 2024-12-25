import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { REGIONS } from "@/utils/mockData/locations";
import { PROPERTY_TYPES, ZONE_TYPES } from "@/components/map/filters/constants";
import { MapFilters as MapFiltersType } from "./types";
import { UserRole } from "@/types/auth";
import { SearchField } from "./filters/SearchField";

export interface MapFiltersProps {
  filters: MapFiltersType;
  setFilters: React.Dispatch<React.SetStateAction<MapFiltersType>>;
  onApplyFilters: () => void;
  userRole: UserRole;
}

export const MapFilters = ({ filters, setFilters, onApplyFilters, userRole }: MapFiltersProps) => {
  return (
    <Card className="h-full overflow-auto">
      <CardHeader>
        <CardTitle>Filtres</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Région</Label>
          <Select 
            value={filters.region} 
            onValueChange={(value) => setFilters(prev => ({ ...prev, region: value }))}
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
          <Label>Type de Bien</Label>
          <Select 
            value={filters.propertyType} 
            onValueChange={(value) => setFilters(prev => ({ ...prev, propertyType: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(PROPERTY_TYPES).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Zone</Label>
          <Select 
            value={filters.zoneType} 
            onValueChange={(value) => setFilters(prev => ({ ...prev, zoneType: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une zone" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(ZONE_TYPES).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Superficie (m²)</Label>
          <Slider
            value={filters.size}
            onValueChange={(value) => setFilters(prev => ({ ...prev, size: value as [number, number] }))}
            max={15000}
            step={100}
            className="mt-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.size[0]} m²</span>
            <span>{filters.size[1]} m²</span>
          </div>
        </div>

        {(userRole === 'commune' || userRole === 'owner') && (
          <div className="space-y-2">
            <Label>Statut Fiscal</Label>
            <Select 
              value={filters.status} 
              onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PAID">Payé</SelectItem>
                <SelectItem value="OVERDUE">En retard</SelectItem>
                <SelectItem value="PENDING">En attente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label>Recherche par Propriétaire</Label>
          <SearchField
            value={filters.ownerName}
            onChange={(value) => setFilters(prev => ({ ...prev, ownerName: value }))}
            type="owner"
            placeholder="Nom du propriétaire"
          />
        </div>

        <div className="space-y-2">
          <Label>Numéro TF</Label>
          <Input
            value={filters.titleDeedNumber}
            onChange={(e) => setFilters(prev => ({ ...prev, titleDeedNumber: e.target.value }))}
            placeholder="Entrez le numéro TF"
          />
        </div>

        <Button 
          className="w-full" 
          onClick={onApplyFilters}
        >
          Appliquer les filtres
        </Button>
      </CardContent>
    </Card>
  );
};