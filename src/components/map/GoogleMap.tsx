import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useToast } from "@/hooks/use-toast";
import type { Parcel } from '@/utils/mockData/types';
import { UserRole } from '@/types/auth';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8';
const DEFAULT_CENTER = { lat: 33.5731, lng: -7.5898 }; // Casablanca
const DEFAULT_ZOOM = 12;

interface GoogleMapProps {
  onMarkerClick: (parcel: Parcel, position: { x: number, y: number }) => void;
  parcels: Parcel[];
  theme: 'light' | 'dark';
  setMapInstance: (map: google.maps.Map) => void;
  userRole?: UserRole;
  center?: { lat: number; lng: number };
  zoom?: number;
  getMarkerColor?: (status: string) => string;
}

export const GoogleMap = ({ 
  onMarkerClick, 
  parcels, 
  theme, 
  setMapInstance, 
  userRole,
  center,
  zoom = DEFAULT_ZOOM,
  getMarkerColor
}: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const { toast } = useToast();

  const defaultMarkerColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return '#10B981'; // Green for paid
      case 'PENDING':
        return '#F59E0B'; // Orange for pending
      case 'OVERDUE':
        return '#EF4444'; // Red for overdue
      default:
        return '#6B7280'; // Gray default
    }
  };

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: 'weekly',
      });

      try {
        const google = await loader.load();
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: center || DEFAULT_CENTER,
            zoom: zoom,
            styles: theme === 'dark' ? [
              { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            ] : [
              { featureType: "all", elementType: "labels.text.fill", stylers: [{ color: "#7c93a3" }] },
              { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#E3F2FD" }] },
              { featureType: "landscape", elementType: "geometry.fill", stylers: [{ color: "#F5F5F5" }] },
            ],
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            gestureHandling: "greedy",
          });

          setMap(mapInstance);
          setMapInstance(mapInstance);
          
          if (center) {
            new google.maps.Marker({
              position: center,
              map: mapInstance,
              animation: google.maps.Animation.DROP,
            });
          } else {
            createMarkers(parcels, mapInstance);
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la carte:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger la carte Google Maps",
          variant: "destructive",
        });
      }
    };

    initMap();
  }, [center, zoom, parcels]);

  const createMarkers = (parcels: Parcel[], map: google.maps.Map) => {
    markers.forEach(marker => marker.setMap(null));
    
    const newMarkers = parcels.map(parcel => {
      const marker = new google.maps.Marker({
        position: parcel.location,
        map: map,
        title: parcel.title,
        animation: google.maps.Animation.DROP,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: getMarkerColor ? getMarkerColor(parcel.taxStatus) : defaultMarkerColor(parcel.taxStatus),
          fillOpacity: 1,
          strokeWeight: 1,
          strokeColor: '#FFFFFF',
          scale: 8,
        },
      });

      marker.addListener("click", () => {
        const position = getMarkerPixelPosition(marker, map);
        onMarkerClick(parcel, position);
      });

      return marker;
    });

    setMarkers(newMarkers);
  };

  const getMarkerPixelPosition = (marker: google.maps.Marker, map: google.maps.Map) => {
    const scale = Math.pow(2, map.getZoom() || 0);
    const nw = new google.maps.LatLng(
      map.getBounds()?.getNorthEast().lat() || 0,
      map.getBounds()?.getSouthWest().lng() || 0
    );
    const worldCoordinateNW = map.getProjection()?.fromLatLngToPoint(nw);
    const worldCoordinate = map.getProjection()?.fromLatLngToPoint(marker.getPosition() as google.maps.LatLng);
    
    if (worldCoordinateNW && worldCoordinate) {
      const pixelOffset = new google.maps.Point(
        Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
        Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
      );

      const mapContainer = map.getDiv();
      const containerOffset = {
        x: mapContainer.offsetLeft,
        y: mapContainer.offsetTop
      };

      return {
        x: pixelOffset.x + containerOffset.x,
        y: pixelOffset.y + containerOffset.y
      };
    }
    
    return { x: 0, y: 0 };
  };

  return (
    <div 
      ref={mapRef} 
      className="absolute inset-0 w-full h-full"
      style={{ minHeight: '500px' }}
    />
  );
};