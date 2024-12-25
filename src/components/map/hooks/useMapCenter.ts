import { useEffect } from 'react';

interface UseMapCenterProps {
  map: google.maps.Map | null;
  mapCenter: { lat: number; lng: number; zoom: number };
}

export const useMapCenter = ({ map, mapCenter }: UseMapCenterProps) => {
  useEffect(() => {
    if (!map || !mapCenter) {
      console.log('Map or center coordinates not ready');
      return;
    }

    const { lat, lng, zoom } = mapCenter;
    
    // Validate coordinates
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      console.log('Invalid coordinates:', { lat, lng });
      return;
    }

    try {
      map.panTo({ lat, lng });
      if (typeof zoom === 'number') {
        map.setZoom(zoom);
      }
    } catch (error) {
      console.error('Error updating map center:', error);
    }
  }, [mapCenter, map]);
};