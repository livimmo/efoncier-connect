import { GoogleMap } from '@/components/map/GoogleMap';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Property } from '@/types';
import { useToast } from "@/hooks/use-toast";

interface DeveloperPropertiesMapProps {
  properties: Property[];
}

export const DeveloperPropertiesMap = ({ properties }: DeveloperPropertiesMapProps) => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const { theme } = useTheme();
  const { toast } = useToast();

  const handleMarkerClick = (parcel: any, position: { x: number; y: number }) => {
    if (!parcel) {
      console.log('No parcel data available');
      return;
    }
    console.log('Marker clicked:', parcel, position);
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e) return;
    console.log('Map clicked:', e);
  };

  const validProperties = properties?.filter(property => 
    property && property.location && 
    typeof property.location.lat === 'number' && 
    typeof property.location.lng === 'number'
  ) || [];

  if (validProperties.length === 0) {
    console.log('No valid properties to display');
  }

  return (
    <div className="h-[600px] relative rounded-lg overflow-hidden">
      <GoogleMap
        onMarkerClick={handleMarkerClick}
        onMapClick={handleMapClick}
        parcels={validProperties.map(property => ({
          id: property.id,
          title: property.title || '',
          titleDeedNumber: property.title || '',
          address: property.description || '',
          city: '',
          surface: property.surface_area || 0,
          type: property.property_type as any,
          zone: 'URBAN',
          taxStatus: property.fiscal_status === "compliant" ? "PAID" : "PENDING",
          ownerName: '',
          owner: property.owner_id,
          location: property.location,
          tnbInfo: property.tnbInfo || {
            pricePerMeter: property.price || 0,
            totalAmount: property.price || 0,
            lastUpdate: property.updated_at || new Date().toISOString(),
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