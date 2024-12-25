import { GoogleMap } from '@/components/map/GoogleMap';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Property } from '@/types';
import { Parcel } from '@/utils/mockData/types';

interface DeveloperFavoritesMapProps {
  favorites: Property[];
}

export const DeveloperFavoritesMap = ({ favorites }: DeveloperFavoritesMapProps) => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const { theme } = useTheme();

  const handleMarkerClick = (parcel: Parcel, position: { x: number; y: number }) => {
    console.log('Marker clicked:', parcel, position);
  };

  const convertToParcel = (property: Property): Parcel => ({
    id: property.id,
    title: property.title,
    titleDeedNumber: property.title,
    address: property.description,
    city: '',
    surface: property.surface_area,
    type: property.property_type as any,
    zone: 'URBAN',
    taxStatus: property.fiscal_status === "compliant" ? "PAID" : "UNPAID",
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
  });

  return (
    <div className="h-[600px] relative rounded-lg overflow-hidden">
      <GoogleMap
        onMarkerClick={handleMarkerClick}
        parcels={favorites.map(convertToParcel)}
        theme={theme as 'light' | 'dark'}
        setMapInstance={setMapInstance}
        mapCenter={{ lat: 33.5731, lng: -7.5898, zoom: 10 }}
      />
    </div>
  );
};