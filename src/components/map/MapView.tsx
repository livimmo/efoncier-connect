import GoogleMap from './GoogleMap';
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
  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return '#10B981'; // Vert pour disponible
      case 'SOLD':
        return '#EF4444'; // Rouge pour vendu
      case 'IN_TRANSACTION':
        return '#F59E0B'; // Orange pour en transaction
      default:
        return '#6B7280'; // Gris par défaut
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
          userRole={userRole}
          getMarkerColor={getMarkerColor}
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