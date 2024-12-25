import { GoogleMap } from '@/components/map/GoogleMap';
import { mockParcels } from '@/utils/mockData/parcels';
import { useState } from 'react';
import { useTheme } from 'next-themes';

export const DeveloperPropertiesMap = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const { theme } = useTheme();

  return (
    <div className="h-full relative">
      <GoogleMap
        selectedParcel={selectedParcel}
        markerPosition={markerPosition}
        onParcelSelect={(parcel, position) => {
          setSelectedParcel(parcel);
          if (position) setMarkerPosition(position);
        }}
        filteredParcels={mockParcels}
        settings={{
          theme: theme as 'light' | 'dark',
          unit: 'metric',
        }}
        mapInstance={mapInstance}
        setMapInstance={setMapInstance}
      />
    </div>
  );
};