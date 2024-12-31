import { useState } from 'react';
import { MapContainer } from './map/MapContainer';
import { Header } from './Header';
import { Footer } from './home/Footer';
import { useAuth } from './auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { DeveloperPropertiesTable } from './developer/properties/DeveloperPropertiesTable';
import { Button } from './ui/button';
import { Map as MapIcon, List, ChevronLeft, ChevronRight, X, Maximize2, Minimize2 } from 'lucide-react';
import { mockParcels } from '@/utils/mockData/parcels';
import { MapFilters } from './map/MapFilters';
import { REGIONS } from '@/utils/mockData/locations';
import { MapFilters as MapFiltersType } from './map/types';
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const Map = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(isMobile);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col relative">
        <div className="p-4 flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "lg:hidden z-50",
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
        
        <div className="flex-1 relative">
          <div className={cn(
            "grid transition-all duration-300 ease-in-out h-full relative",
            isFiltersCollapsed ? "lg:grid-cols-[60px,1fr]" : "lg:grid-cols-[300px,1fr]"
          )}>
            <AnimatePresence>
              <motion.div
                initial={false}
                animate={{
                  width: isFiltersCollapsed ? 60 : 300,
                  opacity: isFiltersCollapsed ? 0 : 1
                }}
                className={cn(
                  "absolute lg:relative z-[5] bg-background/95 backdrop-blur-sm lg:backdrop-blur-none h-full",
                  "transition-all duration-300 ease-in-out overflow-hidden",
                  isMobile && isFiltersCollapsed && "translate-x-[-100%]"
                )}
              >
                <MapFilters 
                  onRegionChange={handleRegionChange}
                  onCityChange={handleCityChange}
                  onDistrictChange={handleDistrictChange}
                  filters={filters}
                  setFilters={setFilters}
                  onApplyFilters={handleApplyFilters}
                  userRole={profile?.role}
                  isCollapsed={isFiltersCollapsed}
                  onToggleCollapse={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
                  mapInstance={mapInstance}
                />
              </motion.div>
            </AnimatePresence>

            <div className={cn(
              "h-full transition-all duration-300",
              isFiltersCollapsed && "col-span-2"
            )}>
              {viewMode === 'map' ? (
                <div className="relative h-full">
                  <MapContainer 
                    userRole={profile?.role} 
                    onParcelSelect={handleParcelSelect}
                    mapInstance={mapInstance}
                    setMapInstance={setMapInstance}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-4 right-4 z-10"
                    onClick={toggleFullscreen}
                  >
                    {isFullscreen ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ) : (
                <DeveloperPropertiesTable data={filteredParcels} />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Map;
