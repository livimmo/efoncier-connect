import { useState } from 'react';
import { GoogleMap } from './GoogleMap';
import { DraggableParcelInfo } from './DraggableParcelInfo';
import { MapControls } from './MapControls';
import { useToast } from "@/hooks/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Parcel } from '@/utils/mockData/types';
import type { MapFilters, MapSettings, MapControls as MapControlsType } from './types';
import { mockParcels } from '@/utils/mockData/parcels';

interface MapViewProps {
  filters: MapFilters;
  settings: MapSettings;
  onParcelSelect: (parcel: Parcel, position: { x: number; y: number }) => void;
  selectedParcel: Parcel | null;
  markerPosition: { x: number; y: number } | null;
}

export const MapView = ({
  filters,
  settings,
  onParcelSelect,
  selectedParcel,
  markerPosition
}: MapViewProps) => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [controls, setControls] = useState<MapControlsType>({
    showFilters: false,
    show3DView: false,
    showComparison: false,
    showHistory: false,
  });

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

  const handleControlChange = (control: keyof MapControlsType) => {
    setControls(prev => ({
      ...prev,
      [control]: !prev[control]
    }));
  };

  const handleSettingChange = (setting: keyof MapSettings, value: any) => {
    // This would typically update the settings via a prop or context
    console.log('Setting changed:', setting, value);
  };

  return (
    <div className="relative h-full">
      <div className="absolute inset-0">
        <GoogleMap 
          onMarkerClick={onParcelSelect}
          parcels={mockParcels}
          theme={settings.theme}
          setMapInstance={setMapInstance}
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
        <DraggableParcelInfo
          parcel={selectedParcel}
          onClose={() => onParcelSelect(null, null)}
          markerPosition={markerPosition}
          className={`bg-background/95 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-shadow
            ${isMobile ? 'fixed bottom-0 left-0 right-0 rounded-t-xl rounded-b-none' : ''}`}
        />
      )}
    </div>
  );
};