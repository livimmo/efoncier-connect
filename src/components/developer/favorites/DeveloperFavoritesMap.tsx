import { GoogleMap } from '@/components/map/GoogleMap';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Property } from '@/types';

interface DeveloperFavoritesMapProps {
  favorites: Property[];
}

export const DeveloperFavoritesMap = ({ favorites }: DeveloperFavoritesMapProps) => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const { theme } = useTheme();

  const handleMarkerClick = (property: Property, position: any) => {
    console.log('Marker clicked:', property, position);
  };

  return (
    <div className="h-[600px] relative rounded-lg overflow-hidden">
      <GoogleMap
        onMarkerClick={handleMarkerClick}
        parcels={favorites.map(favorite => ({
          id: favorite.id,
          title: favorite.title,
          location: favorite.location,
          status: favorite.status.toUpperCase(),
          taxStatus: favorite.fiscal_status === "compliant" ? "PAID" : "UNPAID",
          type: favorite.property_type.toUpperCase(),
          surface: favorite.surface_area,
          price: favorite.price,
          owner: favorite.owner_id,
          address: favorite.description,
          titleDeedNumber: favorite.title,
          tnbInfo: {
            pricePerMeter: favorite.price,
            lastPaymentDate: new Date(),
            status: "PAID"
          }
        }))}
        theme={theme as 'light' | 'dark'}
        setMapInstance={setMapInstance}
      />
    </div>
  );
};