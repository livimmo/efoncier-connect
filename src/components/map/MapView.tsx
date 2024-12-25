import { useEffect, useState } from "react";
import GoogleMap from "./GoogleMap";
import { DraggableParcelInfo } from "./DraggableParcelInfo";
import { Parcel } from "@/utils/mockData/types";
import { UserRole } from "@/types/auth";

interface MapViewProps {
  onMarkerClick: (parcel: Parcel, position: { x: number; y: number }) => void;
  selectedParcel: Parcel | null;
  markerPosition: { x: number; y: number } | null;
  onParcelSelect: (parcelId: string) => void;
  filteredParcels: Parcel[];
  settings: any;
  mapInstance: google.maps.Map | null;
  setMapInstance: (map: google.maps.Map) => void;
  userRole?: UserRole;
}

export const MapView = ({
  onMarkerClick,
  selectedParcel,
  markerPosition,
  onParcelSelect,
  filteredParcels,
  settings,
  mapInstance,
  setMapInstance,
  userRole
}: MapViewProps) => {
  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return '#10B981';
      case 'SOLD':
        return '#ea384c';
      case 'IN_TRANSACTION':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  return (
    <div className="relative w-full h-full">
      <GoogleMap
        onMarkerClick={onMarkerClick}
        parcels={filteredParcels}
        theme={settings.theme}
        setMapInstance={setMapInstance}
        userRole={userRole}
        getMarkerColor={getMarkerColor}
      />
      
      {selectedParcel && markerPosition && (
        <DraggableParcelInfo
          parcel={selectedParcel}
          onClose={() => onParcelSelect("")}
          markerPosition={markerPosition}
          userRole={userRole}
        />
      )}
    </div>
  );
};