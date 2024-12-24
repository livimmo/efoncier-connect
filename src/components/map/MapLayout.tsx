import { useState, useMemo } from 'react';
import { MapFilters } from './MapFilters';
import { MapView } from './MapView';
import { MobileFiltersSheet } from './MobileFiltersSheet';
import { PartnersCarousel } from './PartnersCarousel';
import { WelcomeDialog } from './WelcomeDialog';
import { MapFilters as MapFiltersType, MapSettings } from './types';
import { mockParcels } from '@/utils/mockData/parcels';
import type { Parcel } from '@/utils/mockData/types';
import { useMediaQuery } from "@/hooks/use-media-query";
import { useToast } from "@/hooks/use-toast";

export const MapLayout = () => {
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ x: number; y: number } | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { toast } = useToast();
  
  const [filters, setFilters] = useState<MapFiltersType>({
    region: '',
    commune: '',
    propertyType: '',
    zoneType: '',
    size: [0, 15000],
    status: '',
  });

  const [settings, setSettings] = useState<MapSettings>({
    theme: 'light',
    unit: 'metric',
  });

  const filteredParcels = useMemo(() => {
    return mockParcels.filter(parcel => {
      if (filters.commune && parcel.city.toLowerCase() !== filters.commune.toLowerCase()) return false;
      if (filters.propertyType && parcel.type !== filters.propertyType) return false;
      if (filters.zoneType && parcel.zone !== filters.zoneType) return false;
      if (filters.status && parcel.taxStatus !== filters.status) return false;
      if (parcel.surface < filters.size[0] || parcel.surface > filters.size[1]) return false;
      return true;
    });
  }, [filters]);

  const handleParcelSelect = (parcel: Parcel, position?: { x: number; y: number }) => {
    setSelectedParcel(parcel);
    if (position) {
      setMarkerPosition(position);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <WelcomeDialog />
      
      <div className="flex-1 flex flex-col lg:flex-row relative">
        {isMobile ? (
          <MobileFiltersSheet 
            filters={filters}
            setFilters={setFilters}
            filteredParcelsCount={filteredParcels.length}
          />
        ) : (
          <div className="w-96 p-4 bg-background/95 backdrop-blur-sm border-r overflow-y-auto">
            <MapFilters 
              filters={filters}
              setFilters={setFilters}
              onApplyFilters={() => {
                toast({
                  title: "Filtres appliqués",
                  description: `${filteredParcels.length} parcelles trouvées`,
                });
              }}
            />
          </div>
        )}

        <MapView 
          selectedParcel={selectedParcel}
          markerPosition={markerPosition}
          onParcelSelect={handleParcelSelect}
          filteredParcels={filteredParcels}
          settings={settings}
          mapInstance={mapInstance}
          setMapInstance={setMapInstance}
        />
      </div>

      <div className="bg-background/95 backdrop-blur-sm border-t">
        <PartnersCarousel />
      </div>
    </div>
  );
};