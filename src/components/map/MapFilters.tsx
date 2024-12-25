import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SmartSearchBar } from "./filters/SmartSearchBar";
import { BasicFilters } from "./filters/BasicFilters";
import { PropertyFilters } from "./filters/PropertyFilters";
import { PaymentFilters } from "./filters/PaymentFilters";
import { MapFiltersProps } from "./types";

export const MapFilters = ({ 
  onRegionChange, 
  onCityChange, 
  onDistrictChange,
  filters,
  setFilters,
  onApplyFilters,
  userRole 
}: MapFiltersProps) => {
  const handleSearch = (query: string) => {
    setFilters?.({
      ...filters!,
      searchQuery: query
    });
    onApplyFilters?.();
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
        paymentStatus: ''
      });
    }
    onApplyFilters?.();
  };

  if (!filters || !setFilters) return null;

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Filtres</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SmartSearchBar 
          onSearch={handleSearch}
          onReset={handleReset}
          onViewListResults={() => {
            // Handle view list results
          }}
          className="mb-6"
        />

        <BasicFilters
          filters={filters}
          onRegionChange={onRegionChange!}
          onCityChange={onCityChange!}
          setFilters={setFilters}
        />

        <PropertyFilters
          filters={filters}
          setFilters={setFilters}
        />

        <PaymentFilters
          filters={filters}
          setFilters={setFilters}
          userRole={userRole}
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
    </Card>
  );
};
