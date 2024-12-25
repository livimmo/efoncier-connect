import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SmartSearchBar } from "./filters/SmartSearchBar";
import { BasicFilters } from "./filters/BasicFilters";
import { PropertyFilters } from "./filters/PropertyFilters";
import { PaymentFilters } from "./filters/PaymentFilters";
import { MapFiltersProps } from "./types";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { FilterHeader } from "./filters/FilterHeader";
import { REGIONS } from "@/utils/mockData/locations";

export const MapFilters = ({ 
  onRegionChange, 
  onCityChange, 
  onDistrictChange,
  filters,
  setFilters,
  onApplyFilters,
  userRole,
  isCollapsed,
  onToggleCollapse,
  mapInstance
}: MapFiltersProps) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const years = Array.from({ length: 5 }, (_, i) => (new Date().getFullYear() - i).toString());
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSearch = (query: string) => {
    setFilters?.({
      ...filters!,
      searchQuery: query
    });
    onApplyFilters?.();
  };

  const handleFilterChange = (filterType: string, value: string) => {
    if (!mapInstance) return;

    switch (filterType) {
      case 'region':
        const selectedRegion = REGIONS.find(r => r.id === value);
        if (selectedRegion) {
          mapInstance.panTo({ lat: selectedRegion.center.lat, lng: selectedRegion.center.lng });
          mapInstance.setZoom(10);
        }
        break;

      case 'city':
        const cityCoordinates = {
          'Casablanca': { lat: 33.5731, lng: -7.5898, zoom: 12 },
          'Rabat': { lat: 34.0209, lng: -6.8416, zoom: 12 },
          'Marrakech': { lat: 31.6295, lng: -7.9811, zoom: 12 }
        };
        
        if (value in cityCoordinates) {
          const coords = cityCoordinates[value as keyof typeof cityCoordinates];
          mapInstance.panTo({ lat: coords.lat, lng: coords.lng });
          mapInstance.setZoom(coords.zoom);
        }
        break;
    }

    if (setFilters && filters) {
      setFilters({
        ...filters,
        [filterType]: value
      });
      onApplyFilters?.();
    }
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
        tnbStatus: '',
        propertyStatus: ''
      });
    }
    
    if (mapInstance) {
      mapInstance.panTo({ lat: 33.5731, lng: -7.5898 });
      mapInstance.setZoom(12);
    }
    
    onApplyFilters?.();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PAID':
        return <Badge variant="secondary" className="bg-green-500/10 text-green-500">Payé</Badge>;
      case 'OVERDUE':
        return <Badge variant="secondary" className="bg-red-500/10 text-red-500">En retard</Badge>;
      case 'PENDING':
        return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">En attente</Badge>;
      default:
        return null;
    }
  };

  if (!filters || !setFilters) return null;

  return (
    <Card className={cn(
      "h-fit transition-all duration-300 relative",
      isCollapsed ? 'w-[60px]' : isMobile ? 'w-full' : 'w-[300px]'
    )}>
      <FilterHeader 
        isCollapsed={isCollapsed}
        onToggleCollapse={onToggleCollapse}
        isMobile={isMobile}
      />
      
      {!isCollapsed && (
        <CardContent className="space-y-6">
          <SmartSearchBar 
            onSearch={handleSearch}
            onReset={handleReset}
            onViewListResults={() => {}}
            className="mb-6"
          />

          <div className="space-y-4">
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

            <div className="space-y-2">
              <Label>Statut de paiement</Label>
              <Select
                value={filters.paymentStatus}
                onValueChange={(value) => handleFilterChange('paymentStatus', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut">
                    {filters.paymentStatus && getStatusBadge(filters.paymentStatus)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PAID">
                    {getStatusBadge('PAID')}
                  </SelectItem>
                  <SelectItem value="OVERDUE">
                    {getStatusBadge('OVERDUE')}
                  </SelectItem>
                  <SelectItem value="PENDING">
                    {getStatusBadge('PENDING')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <BasicFilters
            filters={filters}
            onRegionChange={(value) => handleFilterChange('region', value)}
            onCityChange={(value) => handleFilterChange('city', value)}
            setFilters={setFilters}
          />

          <PropertyFilters
            filters={filters}
            setFilters={setFilters}
            onFilterChange={handleFilterChange}
          />

          <PaymentFilters
            filters={filters}
            setFilters={setFilters}
            userRole={userRole}
            onFilterChange={handleFilterChange}
          />

          {onApplyFilters && (
            <Button 
              className="w-full" 
              onClick={onApplyFilters}
            >
              Appliquer les filtres
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  );
};
