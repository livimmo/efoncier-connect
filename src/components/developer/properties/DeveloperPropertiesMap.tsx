import { GoogleMap } from '@/components/map/GoogleMap';
import { mockParcels } from '@/utils/mockData/parcels';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import type { Parcel } from '@/utils/mockData/types';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/utils/format';

interface DeveloperPropertiesMapProps {
  parcels?: Parcel[];
  onMapLoad?: (map: google.maps.Map) => void;
}

export const DeveloperPropertiesMap = ({ 
  parcels = mockParcels,
  onMapLoad 
}: DeveloperPropertiesMapProps) => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [infoWindowPosition, setInfoWindowPosition] = useState<{ x: number; y: number } | null>(null);
  const { theme } = useTheme();

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return '#10B981'; // Vert pour disponible
      case 'UNAVAILABLE':
        return '#EF4444'; // Rouge pour indisponible
      case 'IN_TRANSACTION':
        return '#F59E0B'; // Orange pour en transaction
      default:
        return '#6B7280'; // Gris par défaut
    }
  };

  const handleMarkerClick = (parcel: Parcel, position: { x: number; y: number }) => {
    setSelectedParcel(parcel);
    setInfoWindowPosition(position);
  };

  const handleMapLoad = (map: google.maps.Map) => {
    setMapInstance(map);
    onMapLoad?.(map);
  };

  return (
    <div className="h-full relative">
      <GoogleMap
        onMarkerClick={handleMarkerClick}
        parcels={parcels}
        theme={theme as 'light' | 'dark'}
        setMapInstance={handleMapLoad}
        getMarkerColor={getMarkerColor}
      />

      {selectedParcel && infoWindowPosition && (
        <Card className="absolute z-50 p-4 min-w-[250px] bg-background/95 backdrop-blur-sm shadow-lg"
              style={{
                left: `${infoWindowPosition.x}px`,
                top: `${infoWindowPosition.y}px`,
                transform: 'translate(-50%, -120%)'
              }}>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{selectedParcel.title}</h4>
              <span className={`text-xs px-2 py-1 rounded-full ${
                selectedParcel.status === 'AVAILABLE' 
                  ? 'bg-green-100 text-green-800'
                  : selectedParcel.status === 'IN_TRANSACTION'
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {selectedParcel.status === 'AVAILABLE' 
                  ? 'Disponible'
                  : selectedParcel.status === 'IN_TRANSACTION'
                  ? 'En Transaction'
                  : 'Indisponible'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Superficie</p>
                <p className="font-medium">{selectedParcel.surface} m²</p>
              </div>
              <div>
                <p className="text-muted-foreground">Zone</p>
                <p className="font-medium">{selectedParcel.zone}</p>
              </div>
              {selectedParcel.price && (
                <div className="col-span-2">
                  <p className="text-muted-foreground">Prix</p>
                  <p className="font-medium">{formatCurrency(selectedParcel.price)} DH</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};