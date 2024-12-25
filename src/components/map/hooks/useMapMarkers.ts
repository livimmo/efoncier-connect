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
    if (map && Array.isArray(parcels)) {
      console.log('Updating markers for', parcels.length, 'parcels');
      markersRef.current = createMarkers(parcels, map, onMarkerClick, markersRef.current);
    }

    return () => {
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.setMap(null));
      }
    };
  }, [parcels, map, onMarkerClick]);

  return { markers: markersRef.current };
};