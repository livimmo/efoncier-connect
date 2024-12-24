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
import { calculateInfoPosition } from './utils/positionUtils';

export const MapContainer = () => {
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ x: number; y: number } | null>(null);
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

  const handleParcelSelect = (parcel: Parcel, event: { clientX: number; clientY: number }) => {
    const adjustedPosition = calculateInfoPosition(
      event.clientX,
      event.clientY,
      window.innerWidth,
      window.innerHeight
    );
    setSelectedParcel(parcel);
    setMarkerPosition(adjustedPosition);
  };

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <WelcomeDialog />
      
      <div className="flex-1 flex flex-col lg:flex-row relative">
        <div className="w-full lg:w-1/4 p-4 bg-background/95 backdrop-blur-sm border-r">
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

        <div className="flex-1 relative">
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
            />
          </div>

          {selectedParcel && markerPosition && (
            <div 
              className="absolute z-20"
              style={{
                left: `${markerPosition.x}px`,
                top: `${markerPosition.y}px`,
                maxWidth: 'calc(100vw - 40px)',
                maxHeight: 'calc(100vh - 40px)',
                overflow: 'auto'
              }}
            >
              <ParcelInfo 
                parcel={selectedParcel}
                onClose={() => {
                  setSelectedParcel(null);
                  setMarkerPosition(null);
                }}
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
