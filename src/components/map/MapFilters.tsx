import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SmartSearchBar } from "./filters/SmartSearchBar";
import { LocationFilter } from "./filters/LocationFilter";
import { StatusFilter } from "./filters/StatusFilter";
import { MapFiltersProps } from "./types";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const handleSearch = (query: string) => {
    setFilters?.({
      ...filters!,
      searchQuery: query
    });
    onApplyFilters?.();
  };

  const handleFilterChange = (filterType: string, value: string) => {
    if (!mapInstance) return;

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

          <LocationFilter
            filters={filters}
            onRegionChange={onRegionChange}
            onCityChange={onCityChange}
            setFilters={setFilters}
          />

          <StatusFilter
            filters={filters}
            setFilters={setFilters}
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