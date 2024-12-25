import { useEffect } from 'react';

interface UseMapCenterProps {
  map: google.maps.Map | null;
  mapCenter: { lat: number; lng: number; zoom: number };
}

export const useMapCenter = ({ map, mapCenter }: UseMapCenterProps) => {
  useEffect(() => {
    if (map && mapCenter) {
      map.panTo({ 
        lat: mapCenter.lat || 33.5731, 
        lng: mapCenter.lng || -7.5898 
      });
      map.setZoom(mapCenter.zoom || 10);
    }
  }, [mapCenter, map]);
};