import { useRef } from 'react';
import type { Parcel } from '@/utils/mockData/types';
import { useMapInitialization } from './hooks/useMapInitialization';
import { useMapMarkers } from './hooks/useMapMarkers';
import { useMapCenter } from './hooks/useMapCenter';

interface GoogleMapProps {
  onMarkerClick: (parcel: Parcel, position: { x: number, y: number }) => void;
  onMapClick: (e: google.maps.MapMouseEvent) => void;
  parcels: Parcel[];
  theme: 'light' | 'dark';
  setMapInstance: (map: google.maps.Map) => void;
  mapCenter: { lat: number; lng: number; zoom: number };
}

export const GoogleMap = ({ 
  onMarkerClick, 
  onMapClick,
  parcels = [], 
  theme, 
  setMapInstance,
  mapCenter 
}: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  const { map } = useMapInitialization({
    mapRef,
    theme,
    mapCenter,
    onMapClick,
  });

  useMapMarkers({
    map,
    parcels,
    onMarkerClick,
  });

  useMapCenter({
    map,
    mapCenter,
  });

  // Set map instance for parent component
  useEffect(() => {
    if (map) {
      setMapInstance(map);
    }
  }, [map, setMapInstance]);

  return (
    <div 
      ref={mapRef} 
      className="absolute inset-0 w-full h-full"
      style={{ minHeight: '500px' }}
    />
  );
};