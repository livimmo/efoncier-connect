import { GoogleMap } from '@/components/map/GoogleMap';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Property } from '@/types';
import { Parcel } from '@/utils/mockData/types';
import { useToast } from "@/hooks/use-toast";

interface DeveloperFavoritesMapProps {
  favorites: Property[];
}

export const DeveloperFavoritesMap = ({ favorites }: DeveloperFavoritesMapProps) => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const { theme } = useTheme();
  const { toast } = useToast();

  const handleMarkerClick = (parcel: Parcel, position: { x: number; y: number }) => {
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

  const convertToParcel = (property: Property): Parcel => ({
    id: property.id,
    title: property.title || '',
    titleDeedNumber: property.title || '',
    address: property.description || '',
    city: '',
    surface: property.surface_area || 0,
    type: property.property_type as any,
    zone: 'URBAN',
    taxStatus: property.fiscal_status === "compliant" ? "PAID" : "UNPAID",
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
  });

  const validFavorites = favorites?.filter(favorite => 
    favorite && favorite.location && 
    typeof favorite.location.lat === 'number' && 
    typeof favorite.location.lng === 'number'
  ) || [];

  if (validFavorites.length === 0) {
    console.log('No valid favorites to display');
  }

  return (
    <div className="h-[600px] relative rounded-lg overflow-hidden">
      <GoogleMap
        onMarkerClick={handleMarkerClick}
        onMapClick={handleMapClick}
        parcels={validFavorites.map(convertToParcel)}
        theme={theme as 'light' | 'dark'}
        setMapInstance={setMapInstance}
        mapCenter={{ lat: 33.5731, lng: -7.5898, zoom: 10 }}
      />
    </div>
  );
};