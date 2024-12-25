import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useToast } from "@/hooks/use-toast";
import type { Parcel } from '@/utils/mockData/types';
import { getMapStyles } from './utils/mapStyles';
import { createMarkers } from './utils/markerUtils';

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
  parcels = [], // Provide default empty array
  theme, 
  setMapInstance,
  mapCenter 
}: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const { toast } = useToast();

  // Initialize map
  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) {
        console.log('Map reference not found');
        return;
      }

      try {
        const loader = new Loader({
          apiKey: GOOGLE_MAPS_API_KEY,
          version: 'weekly',
        });

        const google = await loader.load();
        
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { 
            lat: mapCenter?.lat || 33.5731, 
            lng: mapCenter?.lng || -7.5898 
          },
          zoom: mapCenter?.zoom || 10,
          styles: getMapStyles(theme),
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          gestureHandling: "greedy",
          minZoom: 5,
          maxZoom: 18,
        });

        mapInstance.addListener('click', (e: google.maps.MapMouseEvent) => {
          if (e) onMapClick(e);
        });

        setMap(mapInstance);
        setMapInstance(mapInstance);
        
        // Create initial markers only if parcels exist
        if (parcels && parcels.length > 0) {
          console.log('Creating initial markers for', parcels.length, 'parcels');
          markersRef.current = createMarkers(parcels, mapInstance, onMarkerClick, []);
        }
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

    return () => {
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.setMap(null));
      }
    };
  }, []);

  // Update map center when it changes
  useEffect(() => {
    if (map && mapCenter) {
      map.panTo({ 
        lat: mapCenter.lat || 33.5731, 
        lng: mapCenter.lng || -7.5898 
      });
      map.setZoom(mapCenter.zoom || 10);
    }
  }, [mapCenter]);

  // Update markers when parcels change
  useEffect(() => {
    if (map && Array.isArray(parcels)) {
      console.log('Updating markers for', parcels.length, 'parcels');
      markersRef.current = createMarkers(parcels, map, onMarkerClick, markersRef.current);
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