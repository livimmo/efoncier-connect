import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useToast } from "@/hooks/use-toast";
import type { Parcel } from '@/utils/mockData/types';
import { createClusterMarker } from './markers/ClusterMarker';
import { createPropertyMarker } from './markers/PropertyMarker';
import { createClusters } from './utils/clustering';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8';
const DEFAULT_CENTER = { lat: 33.5731, lng: -7.5898 }; // Casablanca
const DEFAULT_ZOOM = 12;

interface GoogleMapProps {
  onMarkerClick: (parcel: Parcel, position: { x: number, y: number }) => void;
  parcels: Parcel[];
  theme: 'light' | 'dark';
  setMapInstance: (map: google.maps.Map) => void;
}

export const GoogleMap = ({ onMarkerClick, parcels, theme, setMapInstance }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<(google.maps.marker.AdvancedMarkerElement)[]>([]);
  const { toast } = useToast();

  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.map = null);
    markersRef.current = [];
  };

  const updateMarkers = (map: google.maps.Map) => {
    const zoom = map.getZoom() || 0;
    clearMarkers();
    
    if (zoom >= 14) {
      // Afficher les marqueurs individuels
      const newMarkers = parcels.map(parcel => 
        createPropertyMarker({
          parcel,
          map,
          onClick: onMarkerClick
        })
      );
      markersRef.current = newMarkers;
    } else {
      // Créer des clusters
      const clusters = createClusters(parcels, zoom);
      const newMarkers = clusters.map(cluster => 
        createClusterMarker({
          ...cluster,
          map
        })
      );
      markersRef.current = newMarkers;
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
            center: DEFAULT_CENTER,
            zoom: DEFAULT_ZOOM,
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

          // Optimiser les événements de zoom et déplacement
          let updateTimeout: NodeJS.Timeout;
          
          const debouncedUpdate = () => {
            clearTimeout(updateTimeout);
            updateTimeout = setTimeout(() => {
              updateMarkers(mapInstance);
            }, 100);
          };

          mapInstance.addListener('zoom_changed', debouncedUpdate);
          mapInstance.addListener('dragend', debouncedUpdate);

          setMap(mapInstance);
          setMapInstance(mapInstance);
          updateMarkers(mapInstance);
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

    return () => {
      clearMarkers();
    };
  }, []);

  useEffect(() => {
    if (map) {
      updateMarkers(map);
    }
  }, [parcels, map]);

  return (
    <div 
      ref={mapRef} 
      className="absolute inset-0 w-full h-full"
      style={{ minHeight: '500px' }}
    />
  );
};