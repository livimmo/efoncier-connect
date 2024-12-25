import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { MapPin, Search, RefreshCw } from "lucide-react";
import { REGIONS } from "@/utils/mockData/locations";
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
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [cities, setCities] = useState<string[]>([]);
  const [communes, setCommunes] = useState<string[]>([]);

  // Update available cities when region changes
  useEffect(() => {
    if (selectedRegion) {
      const region = REGIONS.find(r => r.id === selectedRegion);
      if (region) {
        setCities(region.communes);
        setFilters(prev => ({ ...prev, region: selectedRegion, commune: "" }));
      }
    } else {
      setCities([]);
    }
  }, [selectedRegion]);

  // Reset filters
  const handleReset = () => {
    setSelectedRegion("");
    setCities([]);
    setCommunes([]);
    setFilters(prev => ({
      ...prev,
      region: "",
      commune: "",
      propertyType: "",
      zoneType: "",
      size: [0, 15000],
      status: "",
      ownerName: "",
      titleDeedNumber: "",
    }));
  };

  return (
    <Card className="h-full overflow-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Filtres
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Région</Label>
          <Select 
            value={selectedRegion} 
            onValueChange={setSelectedRegion}
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
            value={filters.commune} 
            onValueChange={(value) => setFilters(prev => ({ ...prev, commune: value }))}
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
          <SearchField
            value={filters.titleDeedNumber}
            onChange={(value) => setFilters(prev => ({ ...prev, titleDeedNumber: value }))}
            type="title"
            placeholder="Entrez le numéro TF"
          />
        </div>

        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            onClick={onApplyFilters}
          >
            <Search className="h-4 w-4 mr-2" />
            Appliquer
          </Button>
          <Button 
            variant="outline"
            onClick={handleReset}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};