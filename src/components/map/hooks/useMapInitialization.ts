import { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useToast } from "@/hooks/use-toast";
import { getMapStyles } from '../utils/mapStyles';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8';

interface UseMapInitializationProps {
  mapRef: React.RefObject<HTMLDivElement>;
  theme: 'light' | 'dark';
  mapCenter: { lat: number; lng: number; zoom: number };
  onMapClick: (e: google.maps.MapMouseEvent) => void;
}

export const useMapInitialization = ({
  mapRef,
  theme,
  mapCenter,
  onMapClick,
}: UseMapInitializationProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { toast } = useToast();

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

  return { map };
};