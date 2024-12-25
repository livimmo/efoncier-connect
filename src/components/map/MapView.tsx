import { GoogleMap } from './GoogleMap';
import { DraggableParcelInfo } from './DraggableParcelInfo';
import { MapLegend } from './MapLegend';
import type { Parcel } from '@/utils/mockData/types';
import type { MapSettings } from './types';
import { useToast } from "@/hooks/use-toast";
import { UserRole } from '@/types/auth';
import { useState } from 'react';
import { LoginDialog } from '../auth/LoginDialog';

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
  const [activeStatus, setActiveStatus] = useState<string | null>(null);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return '#10B981'; // Green for available
      case 'IN_TRANSACTION':
        return '#F59E0B'; // Orange for in transaction
      case 'SOLD':
        return '#EF4444'; // Red for sold
      default:
        return '#6B7280'; // Gray default
    }
  };

  const handleParcelClick = (parcel: Parcel, position: { x: number; y: number }) => {
    if (!userRole) {
      setIsLoginDialogOpen(true);
    } else {
      onParcelSelect(parcel, position);
    }
  };

  const handleStatusFilter = (status: string | null) => {
    setActiveStatus(status);
    if (status) {
      toast({
        title: "Filtres appliqués",
        description: `Affichage des terrains avec le statut : ${status === 'AVAILABLE' ? 'Disponible' : status === 'IN_TRANSACTION' ? 'En Transaction' : 'Vendu'}`,
      });
    }
  };

  const filteredByStatus = activeStatus
    ? filteredParcels.filter(parcel => parcel.status === activeStatus)
    : filteredParcels;

  return (
    <div className="relative flex-1 h-full">
      <div className="absolute inset-0">
        <GoogleMap 
          onMarkerClick={handleParcelClick}
          parcels={filteredByStatus}
          theme={settings.theme}
          setMapInstance={setMapInstance}
          userRole={userRole}
          getMarkerColor={getMarkerColor}
        />
      </div>

      <MapLegend 
        className="hidden md:block" 
        onStatusFilter={handleStatusFilter}
        activeStatus={activeStatus}
      />

      {selectedParcel && markerPosition && !userRole && (
        <DraggableParcelInfo
          parcel={selectedParcel}
          onClose={() => onParcelSelect(null)}
          markerPosition={markerPosition}
          className="bg-background/95 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          userRole={userRole}
        />
      )}

      <LoginDialog 
        open={isLoginDialogOpen}
        onOpenChange={setIsLoginDialogOpen}
      />
    </div>
  );
};