import { useEffect, useRef } from 'react';
import { Parcel } from '@/utils/mockData/types';
import { createMarkers } from '../utils/markerUtils';

interface UseMapMarkersProps {
  map: google.maps.Map | null;
  parcels: Parcel[];
  onMarkerClick: (parcel: Parcel, position: { x: number; y: number }) => void;
}

export const useMapMarkers = ({ map, parcels, onMarkerClick }: UseMapMarkersProps) => {
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    // Safety check for map and parcels
    if (!map || !Array.isArray(parcels)) {
      console.log('Map or parcels not ready:', { map: !!map, parcels: !!parcels });
      return;
    }

    // Filter out invalid parcels
    const validParcels = parcels.filter(parcel => 
      parcel && 
      parcel.location && 
      typeof parcel.location.lat === 'number' && 
      typeof parcel.location.lng === 'number'
    );

    console.log('Creating markers for valid parcels:', validParcels.length);
    
    // Create markers only for valid parcels
    markersRef.current = createMarkers(validParcels, map, onMarkerClick, markersRef.current);

    // Cleanup function
    return () => {
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
      }
    };
  }, [parcels, map, onMarkerClick]);

  return { markers: markersRef.current };
};