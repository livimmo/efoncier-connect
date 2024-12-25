import { GoogleMap } from './GoogleMap';
import { DraggableParcelInfo } from './DraggableParcelInfo';
import type { Parcel } from '@/utils/mockData/types';
import type { MapSettings } from './types';
import { useToast } from "@/hooks/use-toast";
import { useCallback } from 'react';

interface MapViewProps {
  selectedParcel: Parcel | null;
  markerPosition: { x: number; y: number } | null;
  onParcelSelect: (parcel: Parcel | null, position?: { x: number; y: number }) => void;
  filteredParcels: Parcel[];
  settings: MapSettings;
  mapInstance: google.maps.Map | null;
  setMapInstance: (map: google.maps.Map) => void;
  mapCenter: { lat: number; lng: number; zoom: number };
}

export const MapView = ({
  selectedParcel,
  markerPosition,
  onParcelSelect,
  filteredParcels,
  settings,
  mapInstance,
  setMapInstance,
  mapCenter,
}: MapViewProps) => {
  const { toast } = useToast();

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    // Si le clic n'est pas sur un marqueur, fermer la fenêtre d'info
    if (e.placeId === undefined) {
      onParcelSelect(null);
    }
  }, [onParcelSelect]);

  return (
    <div className="relative flex-1 h-full">
      <div className="absolute inset-0">
        <GoogleMap 
          onMarkerClick={(parcel, position) => onParcelSelect(parcel, position)}
          onMapClick={handleMapClick}
          parcels={filteredParcels}
          theme={settings.theme}
          setMapInstance={setMapInstance}
          mapCenter={mapCenter}
        />
      </div>

      {selectedParcel && markerPosition && (
        <DraggableParcelInfo
          parcel={selectedParcel}
          onClose={() => onParcelSelect(null)}
          markerPosition={markerPosition}
          className="bg-background/95 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        />
      )}
    </div>
  );
};