import { GoogleMap } from '@/components/map/GoogleMap';
import { mockParcels } from '@/utils/mockData/parcels';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import type { Parcel } from '@/utils/mockData/types';

interface DeveloperPropertiesMapProps {
  parcels?: Parcel[];
  onMapLoad?: (map: google.maps.Map) => void;
}

export const DeveloperPropertiesMap = ({ 
  parcels = mockParcels,
  onMapLoad 
}: DeveloperPropertiesMapProps) => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const { theme } = useTheme();

  const handleMarkerClick = (parcel: any, position: any) => {
    console.log('Marker clicked:', parcel, position);
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
      />
    </div>
  );
};