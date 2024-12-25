import { useState, useMemo } from 'react';
import { MapContainer } from './map/MapContainer';
import { Header } from './Header';
import { useAuth } from './auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { DeveloperPropertiesTable } from './developer/properties/DeveloperPropertiesTable';
import { Button } from './ui/button';
import { Map as MapIcon, List, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [filters, setFilters] = useState<MapFiltersType>({
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

  // Filtrer les parcelles en fonction des filtres
  const filteredParcels = useMemo(() => {
    return mockParcels.filter(parcel => {
      // Filtre par région
      if (filters.region && parcel.region !== filters.region) return false;

      // Filtre par commune
      if (filters.commune && parcel.city.toLowerCase() !== filters.commune.toLowerCase()) return false;

      // Filtre par type de propriété
      if (filters.propertyType && parcel.type !== filters.propertyType) return false;

      // Filtre par zone
      if (filters.zoneType && parcel.zone !== filters.zoneType) return false;

      // Filtre par surface
      if (parcel.surface < filters.size[0] || parcel.surface > filters.size[1]) return false;

      // Filtre par statut
      if (filters.status && parcel.status !== filters.status) return false;

      // Filtre par propriétaire
      if (filters.ownerName && !parcel.ownerName.toLowerCase().includes(filters.ownerName.toLowerCase())) return false;

      // Filtre par numéro de titre foncier
      if (filters.titleDeedNumber && !parcel.titleDeedNumber.toLowerCase().includes(filters.titleDeedNumber.toLowerCase())) return false;

      // Filtre par statut fiscal
      if (filters.fiscalStatus && parcel.taxStatus !== filters.fiscalStatus) return false;

      // Filtre par statut de paiement
      if (filters.paymentStatus && parcel.taxStatus !== filters.paymentStatus) return false;

      // Filtre par statut TNB
      if (filters.tnbStatus && parcel.tnbInfo.status !== filters.tnbStatus) return false;

      // Filtre par recherche globale
      if (filters.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
        return (
          parcel.titleDeedNumber.toLowerCase().includes(searchLower) ||
          parcel.ownerName.toLowerCase().includes(searchLower) ||
          parcel.address.toLowerCase().includes(searchLower) ||
          parcel.city.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [filters]);

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
      description: `${filteredParcels.length} résultats trouvés`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col">
        <div className="p-4 flex justify-end gap-2">
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
        
        <div className="flex-1 p-4">
          {viewMode === 'map' ? (
            <div className="grid lg:grid-cols-[auto,1fr] gap-4 h-full relative">
              {isMobile && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 left-2 z-10 bg-background/95 backdrop-blur-sm"
                  onClick={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
                >
                  {isFiltersCollapsed ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronLeft className="h-4 w-4" />
                  )}
                </Button>
              )}
              <div className={cn(
                "absolute lg:relative z-[5] bg-background/95 backdrop-blur-sm lg:backdrop-blur-none transition-all duration-300 ease-in-out",
                isMobile ? (
                  isFiltersCollapsed 
                    ? "-translate-x-full opacity-0" 
                    : "translate-x-0 opacity-100"
                ) : ""
              )}>
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
                <MapContainer 
                  userRole={profile?.role} 
                  onParcelSelect={handleParcelSelect}
                  mapInstance={mapInstance}
                  setMapInstance={setMapInstance}
                  parcels={filteredParcels}
                />
              </div>
            </div>
          ) : (
            <DeveloperPropertiesTable data={filteredParcels} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;