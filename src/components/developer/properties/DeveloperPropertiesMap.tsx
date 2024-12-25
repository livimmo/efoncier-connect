import { GoogleMap } from '@/components/map/GoogleMap';
import { mockParcels } from '@/utils/mockData/parcels';
import { useState } from 'react';
import { useTheme } from 'next-themes';

export const DeveloperPropertiesMap = () => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const { theme } = useTheme();

  const handleMarkerClick = (parcel: any, position: any) => {
    console.log('Marker clicked:', parcel, position);
  };

  return (
    <div className="h-full relative">
      <GoogleMap
        onMarkerClick={handleMarkerClick}
        parcels={mockParcels}
        theme={theme as 'light' | 'dark'}
        setMapInstance={setMapInstance}
      />
    </div>
  );
};