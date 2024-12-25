import { useEffect, useRef, useState } from 'react';
import { GoogleMap } from './GoogleMap';
import { DraggableParcelInfo } from './DraggableParcelInfo';
import { mockParcels } from '@/utils/mockData/parcels';
import type { Parcel } from '@/utils/mockData/types';
import { UserRole } from '@/types/auth';

interface MapContainerProps {
  userRole?: UserRole;
  onParcelSelect: (parcelId: string) => void;
  mapInstance: google.maps.Map | null;
  setMapInstance: (map: google.maps.Map) => void;
  parcels?: Parcel[];
}

export const MapContainer = ({ 
  userRole, 
  onParcelSelect, 
  mapInstance,
  setMapInstance,
  parcels = mockParcels
}: MapContainerProps) => {
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ x: number; y: number } | null>(null);

  const handleParcelSelect = (parcel: Parcel | null, position?: { x: number; y: number }) => {
    setSelectedParcel(parcel);
    if (position) {
      setMarkerPosition(position);
    }
    if (parcel) {
      onParcelSelect(parcel.id);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-background">
      <div className="flex-1 relative">
        <GoogleMap 
          onMarkerClick={(parcel, position) => handleParcelSelect(parcel, position)}
          parcels={parcels}
          theme="light"
          setMapInstance={setMapInstance}
          userRole={userRole}
        />
      </div>

      {selectedParcel && markerPosition && (
        <DraggableParcelInfo
          parcel={selectedParcel}
          onClose={() => handleParcelSelect(null)}
          markerPosition={markerPosition}
          className="bg-background/95 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          userRole={userRole}
        />
      )}
    </div>
  );
};