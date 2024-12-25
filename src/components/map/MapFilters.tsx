import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SmartSearchBar } from "./filters/SmartSearchBar";
import { StatusFilter } from "./filters/StatusFilter";
import { LocationFilter } from "./filters/LocationFilter";
import { MapFiltersProps } from "./types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

export const MapFilters = ({ 
  onRegionChange, 
  onCityChange, 
  filters,
  setFilters,
  onApplyFilters,
  userRole,
  isCollapsed,
  onToggleCollapse,
  mapInstance
}: MapFiltersProps) => {
  const [selectedYear] = useState(new Date().getFullYear().toString());
  const years = Array.from({ length: 5 }, (_, i) => (new Date().getFullYear() - i).toString());
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    setFilters?.({
      ...filters!,
      searchQuery: query
    });
  };

  const handleFilterChange = (filterType: string, value: string) => {
    if (!setFilters || !filters) return;

    setFilters({
      ...filters,
      [filterType]: value
    });
  };

  const handleReset = () => {
    if (setFilters) {
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
        fiscalStatus: '',
        maxPrice: 0,
        tnbReference: '',
        searchQuery: '',
        zoning: '',
        paymentStatus: '',
        tnbStatus: ''
      });
    }
    
    if (mapInstance) {
      mapInstance.panTo({ lat: 33.5731, lng: -7.5898 });
      mapInstance.setZoom(12);
    }
  };

  if (!filters || !setFilters) return null;

  return (
    <Card className={`h-fit transition-all duration-300 ${isCollapsed ? 'w-[60px]' : 'w-[300px]'}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {!isCollapsed && <CardTitle>Filtres</CardTitle>}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="ml-auto"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </CardHeader>
      
      {!isCollapsed && (
        <CardContent className="space-y-6">
          <SmartSearchBar 
            onSearch={handleSearch}
            onReset={handleReset}
            onViewListResults={() => {}}
            className="mb-6"
          />

          <StatusFilter 
            value={filters.status}
            onChange={(value) => handleFilterChange('status', value)}
          />

          <LocationFilter
            region={filters.region}
            city={filters.commune}
            onRegionChange={(value) => {
              handleFilterChange('region', value);
              onRegionChange?.(value);
            }}
            onCityChange={(value) => {
              handleFilterChange('commune', value);
              onCityChange?.(value);
            }}
          />

          <div className="space-y-4">
            <Label>Superficie (m²)</Label>
            <Slider
              defaultValue={[0, 15000]}
              max={15000}
              step={100}
              value={filters.size}
              onValueChange={(value) => handleFilterChange('size', value.join(','))}
              className="mt-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filters.size[0]} m²</span>
              <span>{filters.size[1]} m²</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Année fiscale</Label>
            <Select 
              value={selectedYear}
              onValueChange={(value) => handleFilterChange('fiscalYear', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une année" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full" 
            onClick={() => {
              onApplyFilters?.();
              toast({
                title: "Filtres appliqués",
                description: "Les résultats ont été mis à jour selon vos critères.",
              });
            }}
          >
            Appliquer les filtres
          </Button>
        </CardContent>
      )}
    </Card>
  );
};