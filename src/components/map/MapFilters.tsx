import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { SmartSearchBar } from "./filters/SmartSearchBar";
import { BasicFilters } from "./filters/BasicFilters";
import { PropertyFilters } from "./filters/PropertyFilters";
import { PaymentFilters } from "./filters/PaymentFilters";
import { MapFiltersProps } from "./types";
import { FilterHeader } from "./filters/FilterHeader";
import { FiscalYearFilter } from "./filters/FiscalYearFilter";
import { StatusFilter } from "./filters/StatusFilter";
import { FilterActions } from "./filters/FilterActions";

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

  const handleSearch = (query: string) => {
    setFilters?.({
      ...filters!,
      searchQuery: query
    });
    onApplyFilters?.();
  };

  const handleFilterChange = (filterType: string, value: string) => {
    if (!mapInstance) return;

    if (filterType === 'region') {
      const region = REGIONS.find(r => r.id === value);
      if (region && mapInstance) {
        mapInstance.panTo({ lat: region.center.lat, lng: region.center.lng });
        mapInstance.setZoom(10);
      }
    }

    if (filterType === 'city') {
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
        tnbStatus: ''
      });
    }
    
    if (mapInstance) {
      mapInstance.panTo({ lat: 33.5731, lng: -7.5898 });
      mapInstance.setZoom(12);
    }
    
    onApplyFilters?.();
  };

  if (!filters || !setFilters) return null;

  return (
    <Card className={`h-fit transition-all duration-300 ${isCollapsed ? 'w-[60px]' : 'w-[300px]'}`}>
      <FilterHeader isCollapsed={isCollapsed} onToggleCollapse={onToggleCollapse} />
      
      {!isCollapsed && (
        <CardContent className="space-y-6">
          <SmartSearchBar 
            onSearch={handleSearch}
            onReset={handleReset}
            onViewListResults={() => {}}
            className="mb-6"
          />

          <FiscalYearFilter
            selectedYear={selectedYear}
            onYearChange={(value) => handleFilterChange('fiscalYear', value)}
          />

          <StatusFilter
            value={filters.paymentStatus}
            onChange={(value) => handleFilterChange('paymentStatus', value)}
          />

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

          <FilterActions 
            onApplyFilters={onApplyFilters!} 
            onReset={handleReset}
          />
        </CardContent>
      )}
    </Card>
  );
};
