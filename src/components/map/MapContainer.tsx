import { useState, useMemo } from 'react';
import { GoogleMap } from './GoogleMap';
import { MapFilters } from './MapFilters';
import { MapControls } from './MapControls';
import { ParcelInfo } from './ParcelInfo';
import { WelcomeDialog } from './WelcomeDialog';
import { PartnersCarousel } from './PartnersCarousel';
import { MapFilters as MapFiltersType, MapControls as MapControlsType, MapSettings } from './types';
import { mockParcels } from '@/utils/mockData/parcels';
import type { Parcel } from '@/utils/mockData/types';
import { useToast } from "@/hooks/use-toast";

export const MapContainer = () => {
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const { toast } = useToast();
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  
  const [filters, setFilters] = useState<MapFiltersType>({
    city: '',
    propertyType: '',
    zoneType: '',
    size: [0, 15000],
    status: '',
  });

  const [controls, setControls] = useState<MapControlsType>({
    showFilters: false,
    show3DView: false,
    showComparison: false,
    showHistory: false,
  });

  const [settings, setSettings] = useState<MapSettings>({
    theme: 'light',
    unit: 'metric',
  });

  const handleControlChange = (control: keyof MapControlsType) => {
    setControls(prev => ({
      ...prev,
      [control]: !prev[control]
    }));
  };

  const handleSettingChange = (setting: keyof MapSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleZoomIn = () => {
    if (mapInstance) {
      mapInstance.setZoom((mapInstance.getZoom() || 0) + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapInstance) {
      mapInstance.setZoom((mapInstance.getZoom() || 0) - 1);
    }
  };

  const handleReset = () => {
    if (mapInstance) {
      mapInstance.setCenter({ lat: 33.5731, lng: -7.5898 });
      mapInstance.setZoom(12);
    }
  };

  const handleLocateMe = async () => {
    if (mapInstance && navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        
        mapInstance.setCenter(userLocation);
        mapInstance.setZoom(15);
        
        toast({
          title: "Localisation réussie",
          description: "La carte a été centrée sur votre position",
        });
      } catch (error) {
        toast({
          title: "Erreur de localisation",
          description: "Impossible d'obtenir votre position",
          variant: "destructive",
        });
      }
    }
  };

  const filteredParcels = useMemo(() => {
    return mockParcels.filter(parcel => {
      if (filters.city && parcel.city.toLowerCase() !== filters.city.toLowerCase()) return false;
      if (filters.propertyType && parcel.type !== filters.propertyType) return false;
      if (filters.zoneType && parcel.zone !== filters.zoneType) return false;
      if (filters.status && parcel.taxStatus !== filters.status) return false;
      if (parcel.surface < filters.size[0] || parcel.surface > filters.size[1]) return false;
      return true;
    });
  }, [filters]);

  const handleParcelSelect = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    toast({
      title: "Parcelle sélectionnée",
      description: `${parcel.title} - ${parcel.surface}m²`,
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-background">
      <WelcomeDialog />
      
      <div className="flex-1 flex flex-col lg:flex-row relative">
        <div className="w-full lg:w-1/3 xl:w-1/4 p-4 bg-background/95 backdrop-blur-sm border-r">
          <MapFilters 
            filters={filters}
            setFilters={setFilters}
            onApplyFilters={() => {
              toast({
                title: "Filtres appliqués",
                description: `${filteredParcels.length} parcelles trouvées`,
              });
            }}
            className="sticky top-4"
          />
        </div>

        <div className="flex-1 relative h-[600px] lg:h-auto">
          <div className="absolute inset-0">
            <GoogleMap 
              onMarkerClick={handleParcelSelect}
              parcels={filteredParcels}
              theme={settings.theme}
            />
          </div>

          <div className="absolute top-4 right-4 z-10">
            <MapControls
              controls={controls}
              settings={settings}
              onControlChange={handleControlChange}
              onSettingChange={handleSettingChange}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onReset={handleReset}
              onLocateMe={handleLocateMe}
              className="bg-background/80 backdrop-blur-sm rounded-lg shadow-lg p-2"
            />
          </div>

          {selectedParcel && (
            <div className="absolute bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-96 z-20">
              <ParcelInfo 
                parcel={selectedParcel}
                onClose={() => setSelectedParcel(null)}
                className="bg-background/95 backdrop-blur-sm rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-background/95 backdrop-blur-sm border-t">
        <PartnersCarousel />
      </div>
    </div>
  );
};
