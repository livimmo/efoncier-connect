import { GoogleMap } from '@/components/map/GoogleMap';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Property } from '@/types';

interface DeveloperPropertiesMapProps {
  properties: Property[];
}

export const DeveloperPropertiesMap = ({ properties }: DeveloperPropertiesMapProps) => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const { theme } = useTheme();

  const handleMarkerClick = (parcel: any, position: { x: number; y: number }) => {
    console.log('Marker clicked:', parcel, position);
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    console.log('Map clicked:', e);
  };

  return (
    <div className="h-[600px] relative rounded-lg overflow-hidden">
      <GoogleMap
        onMarkerClick={handleMarkerClick}
        onMapClick={handleMapClick}
        parcels={properties.map(property => ({
          id: property.id,
          title: property.title,
          titleDeedNumber: property.title,
          address: property.description,
          city: '',
          surface: property.surface_area,
          type: property.property_type as any,
          zone: 'URBAN',
          taxStatus: property.fiscal_status === "compliant" ? "PAID" : "PENDING",
          ownerName: '',
          owner: property.owner_id,
          location: property.location,
          tnbInfo: property.tnbInfo || {
            pricePerMeter: property.price,
            totalAmount: property.price,
            lastUpdate: property.updated_at,
            status: "LOW"
          },
          status: property.status as any,
          fiscalStatus: property.fiscal_status === "compliant" ? "COMPLIANT" : "NON_COMPLIANT"
        }))}
        theme={theme as 'light' | 'dark'}
        setMapInstance={setMapInstance}
        mapCenter={{ lat: 33.5731, lng: -7.5898, zoom: 10 }}
      />
    </div>
  );
};