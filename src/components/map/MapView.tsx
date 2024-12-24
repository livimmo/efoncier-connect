import { useState } from 'react';
import { GoogleMap } from './GoogleMap';
import { MapControls } from './MapControls';
import { DraggableParcelInfo } from './DraggableParcelInfo';
import type { Parcel } from '@/utils/mockData/types';
import type { MapControls as MapControlsType, MapSettings } from './types';
import { useToast } from "@/hooks/use-toast";

interface MapViewProps {
  selectedParcel: Parcel | null;
  markerPosition: { x: number; y: number } | null;
  onParcelSelect: (parcel: Parcel, position?: { x: number; y: number }) => void;
  filteredParcels: Parcel[];
  settings: MapSettings;
  mapInstance: google.maps.Map | null;
  setMapInstance: (map: google.maps.Map) => void;
}

export const MapView = ({
  selectedParcel,
  markerPosition,
  onParcelSelect,
  filteredParcels,
  settings,
  mapInstance,
  setMapInstance,
}: MapViewProps) => {
  const { toast } = useToast();
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

  return (
    <div className="relative flex-1 h-full">
      <div className="absolute inset-0">
        <GoogleMap 
          onMarkerClick={(parcel, position) => onParcelSelect(parcel, position)}
          parcels={filteredParcels}
          theme={settings.theme}
          setMapInstance={setMapInstance}
        />
      </div>

      <div className="absolute top-4 right-4 z-10">
        <MapControls
          controls={controls}
          settings={settings}
          onControlChange={(control) => setControls(prev => ({ ...prev, [control]: !prev[control] }))}
          onSettingChange={() => {}}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleReset}
          onLocateMe={handleLocateMe}
        />
      </div>

      {selectedParcel && markerPosition && (
        <DraggableParcelInfo
          parcel={selectedParcel}
          onClose={() => onParcelSelect(selectedParcel)}
          markerPosition={markerPosition}
          className="bg-background/95 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        />
      )}
    </div>
  );
};