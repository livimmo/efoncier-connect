import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SmartSearchBar } from "./filters/SmartSearchBar";
import { BasicFilters } from "./filters/BasicFilters";
import { PropertyFilters } from "./filters/PropertyFilters";
import { PaymentFilters } from "./filters/PaymentFilters";
import { MapFiltersProps } from "./types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    setFilters?.({
      ...filters!,
      searchQuery: query
    });
    onApplyFilters?.();
  };

  const handleFilterChange = (filterType: string, value: string) => {
    if (!mapInstance) return;

    // Animate map based on filter type
    switch (filterType) {
      case 'region':
        const selectedRegion = REGIONS.find(r => r.id === value);
        if (selectedRegion) {
          mapInstance.panTo({ lat: selectedRegion.center.lat, lng: selectedRegion.center.lng });
          mapInstance.setZoom(10);
          toast({
            title: "Carte mise à jour",
            description: `Vue centrée sur ${selectedRegion.name}`,
          });
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
          toast({
            title: "Carte mise à jour",
            description: `Vue centrée sur ${value}`,
          });
        }
        break;
    }

    // Update filters
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
    
    // Reset map view
    if (mapInstance) {
      mapInstance.panTo({ lat: 33.5731, lng: -7.5898 }); // Default center
      mapInstance.setZoom(12); // Default zoom
      toast({
        title: "Filtres réinitialisés",
        description: "La carte a été réinitialisée",
      });
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
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PAID">
                    {getStatusBadge('PAID')} Payé
                  </SelectItem>
                  <SelectItem value="OVERDUE">
                    {getStatusBadge('OVERDUE')} En retard
                  </SelectItem>
                  <SelectItem value="PENDING">
                    {getStatusBadge('PENDING')} En attente
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
