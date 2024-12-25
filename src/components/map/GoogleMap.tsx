import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useToast } from "@/hooks/use-toast";
import type { Parcel } from '@/utils/mockData/types';
import { UserRole } from '@/types/auth';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8';

interface GoogleMapProps {
  onMarkerClick: (parcel: Parcel, position: { x: number, y: number }) => void;
  parcels: Parcel[];
  theme: 'light' | 'dark';
  setMapInstance: (map: google.maps.Map) => void;
  mapCenter: { lat: number; lng: number; zoom: number };
}

export const GoogleMap = ({ 
  onMarkerClick, 
  parcels, 
  theme, 
  setMapInstance,
  mapCenter 
}: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const { toast } = useToast();

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

  const getMarkerColor = (parcel: Parcel) => {
    switch (parcel.status) {
      case 'AVAILABLE':
        return '#006233'; // Vert
      case 'IN_TRANSACTION':
        return '#FFA500'; // Orange
      case 'SOLD':
        return '#C1272D'; // Rouge
      default:
        return '#808080'; // Gris pour autres statuts
    }
  };

  const createMarkers = (parcels: Parcel[], map: google.maps.Map) => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    
    const bounds = new google.maps.LatLngBounds();
    
    const newMarkers = parcels.map(parcel => {
      const marker = new google.maps.Marker({
        position: parcel.location,
        map: map,
        title: parcel.title,
        optimized: true,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: getMarkerColor(parcel),
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

      bounds.extend(parcel.location);
      return marker;
    });

    markersRef.current = newMarkers;

    // Only fit bounds if there are markers and it's the initial load
    if (newMarkers.length > 0 && !mapCenter) {
      map.fitBounds(bounds);
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
            center: { lat: mapCenter.lat, lng: mapCenter.lng },
            zoom: mapCenter.zoom,
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
            minZoom: 5,
            maxZoom: 18,
          });

          // Add smooth pan/zoom animations
          mapInstance.setOptions({
            zoomAnimation: true,
            panAnimation: true,
          });

          setMap(mapInstance);
          setMapInstance(mapInstance);
          createMarkers(parcels, mapInstance);
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
  }, []);

  useEffect(() => {
    if (map && mapCenter) {
      map.panTo({ lat: mapCenter.lat, lng: mapCenter.lng });
      map.setZoom(mapCenter.zoom);
    }
  }, [mapCenter]);

  useEffect(() => {
    if (map) {
      createMarkers(parcels, map);
    }
  }, [parcels]);

  return (
    <div 
      ref={mapRef} 
      className="absolute inset-0 w-full h-full"
      style={{ minHeight: '500px' }}
    />
  );
};