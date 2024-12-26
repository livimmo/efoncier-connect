import { GoogleMap } from './GoogleMap';
import { DraggableParcelInfo } from './DraggableParcelInfo';
import type { Parcel } from '@/utils/mockData/types';
import type { MapSettings } from './types';
import { useToast } from "@/hooks/use-toast";
import { UserRole } from '@/types/auth';

interface MapViewProps {
  selectedParcel: Parcel | null;
  markerPosition: { x: number; y: number } | null;
  onParcelSelect: (parcel: Parcel | null, position?: { x: number; y: number }) => void;
  filteredParcels: Parcel[];
  settings: MapSettings;
  mapInstance: google.maps.Map | null;
  setMapInstance: (map: google.maps.Map) => void;
  userRole?: UserRole;
}

export const MapView = ({
  selectedParcel,
  markerPosition,
  onParcelSelect,
  filteredParcels,
  settings,
  mapInstance,
  setMapInstance,
  userRole,
}: MapViewProps) => {
  const { toast } = useToast();

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    // Si le clic vient d'un marqueur, ne pas fermer la fenêtre
    if (e.domEvent.target instanceof Element && 
        (e.domEvent.target.closest('.marker') || 
         e.domEvent.target.closest('.parcel-info'))) {
      return;
    }
    
    // Fermer la fenêtre d'information
    onParcelSelect(null);
  };

  return (
    <div className="relative flex-1 h-full">
      <div className="absolute inset-0">
        <GoogleMap 
          onMarkerClick={(parcel, position) => onParcelSelect(parcel, position)}
          parcels={filteredParcels}
          theme={settings.theme}
          setMapInstance={setMapInstance}
          userRole={userRole}
          onMapClick={handleMapClick}
        />
      </div>

      {selectedParcel && markerPosition && (
        <DraggableParcelInfo
          parcel={selectedParcel}
          onClose={() => onParcelSelect(null)}
          markerPosition={markerPosition}
          className="bg-background/95 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          userRole={userRole}
        />
      )}
    </div>
  );
};