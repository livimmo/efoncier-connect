import { useEffect, useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import type { Parcel } from '@/utils/mockData/types';
import { UserRole } from '@/types/auth';

interface GoogleMapProps {
  onMarkerClick: (parcel: Parcel, position: { x: number; y: number }) => void;
  parcels: Parcel[];
  theme?: 'light' | 'dark';
  setMapInstance: (map: google.maps.Map) => void;
  userRole?: UserRole;
  onMapClick?: (e: google.maps.MapMouseEvent) => void;
}

export const GoogleMap = ({ 
  onMarkerClick, 
  parcels, 
  theme = 'light',
  setMapInstance,
  userRole,
  onMapClick
}: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");
      
      if (!mapRef.current) return;

      const map = new Map(mapRef.current, {
        center: { lat: 33.5731, lng: -7.5898 },
        zoom: 12,
        styles: theme === 'dark' ? [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        ] : [],
        mapTypeControl: false,
        streetViewControl: false,
      });

      if (onMapClick) {
        map.addListener("click", onMapClick);
      }

      setMapInstance(map);

      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      const { Marker } = await loader.importLibrary("marker");

      parcels.forEach(parcel => {
        const marker = new Marker({
          position: { lat: parcel.location.lat, lng: parcel.location.lng },
          map,
          title: parcel.title,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: getMarkerColor(parcel.status, userRole),
            fillOpacity: 0.8,
            strokeWeight: 1,
            strokeColor: '#ffffff',
          },
        });

        marker.addListener("click", (e: google.maps.MapMouseEvent) => {
          const markerPosition = marker.getPosition();
          if (!markerPosition) return;

          const pixel = map.getProjection()?.fromLatLngToPoint(markerPosition);
          if (!pixel) return;

          const scale = Math.pow(2, map.getZoom() || 0);
          const worldPoint = new google.maps.Point(pixel.x * scale, pixel.y * scale);
          const bounds = map.getBounds();
          
          if (!bounds) return;

          const ne = bounds.getNorthEast();
          const sw = bounds.getSouthWest();
          const worldWidth = getWorldWidth(ne, sw, scale);

          const position = {
            x: Math.floor(worldPoint.x - worldWidth * Math.floor(worldPoint.x / worldWidth)),
            y: Math.floor(worldPoint.y),
          };

          onMarkerClick(parcel, position);
        });

        markersRef.current.push(marker);
      });
    };

    initMap();

    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
    };
  }, [onMarkerClick, parcels, theme, setMapInstance, userRole, onMapClick]);

  return <div ref={mapRef} className="w-full h-full" />;
};

function getMarkerColor(status: string, userRole?: string): string {
  if (userRole === 'developer') {
    switch (status) {
      case 'AVAILABLE':
        return '#4CAF50';
      case 'IN_TRANSACTION':
        return '#FFA726';
      default:
        return '#E57373';
    }
  }
  
  switch (status) {
    case 'AVAILABLE':
      return '#4CAF50';
    case 'UNAVAILABLE':
      return '#E57373';
    case 'IN_TRANSACTION':
      return '#FFA726';
    case 'SOLD':
      return '#90A4AE';
    case 'DISPUTED':
      return '#F44336';
    default:
      return '#9E9E9E';
  }
}

function getWorldWidth(ne: google.maps.LatLng, sw: google.maps.LatLng, scale: number): number {
  const nePix = new google.maps.Point(
    mercatorProjection(ne.lng()),
    mercatorProjection(ne.lat())
  );
  const swPix = new google.maps.Point(
    mercatorProjection(sw.lng()),
    mercatorProjection(sw.lat())
  );
  return Math.abs(nePix.x - swPix.x) * scale;
}

function mercatorProjection(lng: number): number {
  return 256 * (0.5 + lng / 360);
}