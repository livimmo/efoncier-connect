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
import { SurfaceFilter } from "./filters/SurfaceFilter";
import { PriceFilter } from "./filters/PriceFilter";
import { X } from "lucide-react";

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
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (!filters || !setFilters) return null;

  return (
    <Card className={cn(
      "h-fit transition-all duration-300 relative",
      isCollapsed ? 'w-[60px]' : isMobile ? 'w-full max-w-[300px]' : 'w-[300px]'
    )}>
      <FilterHeader 
        isCollapsed={isCollapsed}
        onToggleCollapse={onToggleCollapse}
        isMobile={isMobile}
      />
      
      {!isCollapsed && (
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Filtres</h3>
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleCollapse}
                className="lg:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <SmartSearchBar 
            onSearch={() => {}}
            onReset={() => {
              if (setFilters) {
                setFilters({
                  region: '',
                  commune: '',
                  city: '',
                  propertyType: '',
                  zoneType: '',
                  size: [0, 15000],
                  status: '',
                  ownerName: '',
                  titleDeedNumber: '',
                  lastPaymentDate: null,
                  fiscalStatus: '',
                  maxPrice: 20000000,
                  minPrice: 0,
                  tnbReference: '',
                  searchQuery: '',
                  zoning: '',
                  paymentStatus: '',
                  tnbStatus: '',
                  propertyStatus: ''
                });
              }
            }}
            onViewListResults={() => {}}
            className="mb-6"
          />

          <SurfaceFilter 
            filters={filters}
            onFilterChange={() => {}}
            setFilters={setFilters}
          />

          <PriceFilter 
            filters={filters}
            onFilterChange={() => {}}
            setFilters={setFilters}
          />

          <BasicFilters
            filters={filters}
            onRegionChange={onRegionChange}
            onCityChange={onCityChange}
            setFilters={setFilters}
          />

          <PropertyFilters
            filters={filters}
            setFilters={setFilters}
            onFilterChange={() => {}}
          />

          <PaymentFilters
            filters={filters}
            setFilters={setFilters}
            userRole={userRole}
            onFilterChange={() => {}}
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