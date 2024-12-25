import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useToast } from "@/hooks/use-toast";
import type { Parcel } from '@/utils/mockData/types';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8';

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
    const bounds = map.getBounds();
    const projection = map.getProjection();
    const position = marker.getPosition();

    if (!bounds || !projection || !position) {
      console.log('Missing required map properties for pixel calculation');
      return { x: 0, y: 0 };
    }

    const nw = new google.maps.LatLng(
      bounds.getNorthEast()?.lat() || 0,
      bounds.getSouthWest()?.lng() || 0
    );

    const worldCoordinateNW = projection.fromLatLngToPoint(nw);
    const worldCoordinate = projection.fromLatLngToPoint(position);
    
    if (!worldCoordinateNW || !worldCoordinate) {
      console.log('Could not calculate world coordinates');
      return { x: 0, y: 0 };
    }

    const scale = Math.pow(2, map.getZoom() || 0);
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
  };

  const getMarkerColor = (parcel: Parcel) => {
    switch (parcel.status) {
      case 'AVAILABLE':
        return '#006233';
      case 'IN_TRANSACTION':
        return '#FFA500';
      case 'SOLD':
        return '#C1272D';
      default:
        return '#808080';
    }
  };

  const createMarkers = (parcels: Parcel[], map: google.maps.Map) => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    
    if (!parcels || parcels.length === 0) {
      console.log('No parcels to display');
      return;
    }
    
    const bounds = new google.maps.LatLngBounds();
    
    const newMarkers = parcels.reduce<google.maps.Marker[]>((acc, parcel) => {
      if (!parcel?.location) {
        console.log('Parcel missing location:', parcel);
        return acc;
      }

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
      return [...acc, marker];
    }, []);

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
        if (!mapRef.current) {
          console.log('Map reference not found');
          return;
        }

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

        // Ajouter l'écouteur de clic sur la carte
        mapInstance.addListener('click', (e: google.maps.MapMouseEvent) => {
          onMapClick(e);
        });

        setMap(mapInstance);
        setMapInstance(mapInstance);
        createMarkers(parcels, mapInstance);
      } catch (error) {
        console.error("Error loading map:", error);
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