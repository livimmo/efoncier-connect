import { useState } from 'react';
import { MapContainer } from './map/MapContainer';
import { Header } from './Header';
import { useAuth } from './auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { DeveloperPropertiesTable } from './developer/properties/DeveloperPropertiesTable';
import { Button } from './ui/button';
import { Map as MapIcon, List, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { mockParcels } from '@/utils/mockData/parcels';
import { MapFilters } from './map/MapFilters';
import { REGIONS } from '@/utils/mockData/locations';
import { MapFilters as MapFiltersType } from './map/types';
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const Map = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(isMobile);

const [filters, setFilters] = useState<MapFiltersType>({
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

  const handleParcelSelect = (parcelId: string) => {
    if (!profile) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour accéder à plus de détails.",
        variant: "destructive",
      });
      return;
    }
  };

  const handleRegionChange = (regionId: string) => {
    const region = REGIONS.find(r => r.id === regionId);
    if (region && mapInstance) {
      mapInstance.panTo({ lat: region.center.lat, lng: region.center.lng });
      mapInstance.setZoom(7);
    }
  };

  const handleCityChange = (cityName: string) => {
    const cityCoordinates = {
      'Casablanca': { lat: 33.5731, lng: -7.5898 },
      'Rabat': { lat: 34.0209, lng: -6.8416 },
      'Marrakech': { lat: 31.6295, lng: -7.9811 },
    };

    if (mapInstance && cityCoordinates[cityName as keyof typeof cityCoordinates]) {
      mapInstance.panTo(cityCoordinates[cityName as keyof typeof cityCoordinates]);
      mapInstance.setZoom(12);
    }
  };

  const handleDistrictChange = (districtName: string) => {
    if (mapInstance) {
      mapInstance.setZoom(14);
    }
  };

  const handleApplyFilters = () => {
    toast({
      title: "Filtres appliqués",
      description: "Les résultats ont été mis à jour selon vos critères.",
    });
  };

  const filteredParcels = mockParcels.filter(parcel => {
    if (filters.propertyType && parcel.type !== filters.propertyType) return false;
    if (filters.paymentStatus && parcel.taxStatus !== filters.paymentStatus) return false;
    if (filters.size[0] > 0 || filters.size[1] < 15000) {
      if (parcel.surface < filters.size[0] || parcel.surface > filters.size[1]) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col">
        <div className="p-4 flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "lg:hidden",
              isFiltersCollapsed ? "ml-0" : "ml-[300px]"
            )}
            onClick={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
          >
            {isFiltersCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'map' ? 'default' : 'outline'}
              onClick={() => setViewMode('map')}
            >
              <MapIcon className="h-4 w-4 mr-2" />
              Carte
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4 mr-2" />
              Liste
            </Button>
          </div>
        </div>
        
        <div className="flex-1 p-4">
          <div className="grid lg:grid-cols-[auto,1fr] gap-4 h-full relative">
            <div className={cn(
              "absolute lg:relative z-[5] bg-background/95 backdrop-blur-sm lg:backdrop-blur-none transition-all duration-300 ease-in-out",
              isMobile ? (
                isFiltersCollapsed 
                  ? "-translate-x-full opacity-0" 
                  : "translate-x-0 opacity-100"
              ) : "",
              "lg:w-[300px]"
            )}>
              {!isFiltersCollapsed && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 lg:hidden"
                  onClick={() => setIsFiltersCollapsed(true)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              <MapFilters 
                onRegionChange={handleRegionChange}
                onCityChange={handleCityChange}
                onDistrictChange={handleDistrictChange}
                filters={filters}
                setFilters={setFilters}
                onApplyFilters={handleApplyFilters}
                userRole={profile?.role}
                isCollapsed={!isMobile && isFiltersCollapsed}
                onToggleCollapse={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
                mapInstance={mapInstance}
              />
            </div>
            <div className="h-[600px] relative">
              {viewMode === 'map' ? (
                <MapContainer 
                  userRole={profile?.role} 
                  onParcelSelect={handleParcelSelect}
                  mapInstance={mapInstance}
                  setMapInstance={setMapInstance}
                />
              ) : (
                <DeveloperPropertiesTable data={filteredParcels} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
