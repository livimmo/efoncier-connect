import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useToast } from "@/hooks/use-toast";
import type { Parcel } from '@/utils/mockData/types';
import { cn } from "@/lib/utils";

const GOOGLE_MAPS_API_KEY = 'AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8';
const DEFAULT_CENTER = { lat: 33.5731, lng: -7.5898 }; // Casablanca
const DEFAULT_ZOOM = 12;

interface GoogleMapProps {
  onMarkerClick: (parcel: Parcel, position: { x: number, y: number }) => void;
  parcels: Parcel[];
  theme: 'light' | 'dark';
  setMapInstance: (map: google.maps.Map) => void;
}

interface MarkerCluster {
  position: google.maps.LatLng;
  count: number;
  available: number;
  sold: number;
  unavailable: number;
  parcels: Parcel[];
}

export const GoogleMap = ({ onMarkerClick, parcels, theme, setMapInstance }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [clusterMarkers, setClusterMarkers] = useState<google.maps.Marker[]>([]);
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
    switch (parcel.taxStatus) {
      case 'PAID':
        return '#006233'; // Vert
      case 'OVERDUE':
        return '#C1272D'; // Rouge
      default:
        return '#FFA500'; // Orange pour "en attente"
    }
  };

  const createClusterMarker = (cluster: MarkerCluster, map: google.maps.Map) => {
    const marker = new google.maps.Marker({
      position: cluster.position,
      map: map,
      label: {
        text: cluster.count.toString(),
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: 'bold'
      },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#1a73e8',
        fillOpacity: 0.9,
        strokeWeight: 2,
        strokeColor: '#FFFFFF',
        scale: Math.max(30, Math.min(cluster.count * 5, 50)),
      },
    });

    // Créer le contenu de l'info-bulle
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div class="p-3 bg-white rounded-lg shadow-lg">
          <h3 class="font-semibold mb-2">${cluster.parcels[0].city}</h3>
          <div class="space-y-1">
            <p>🏢 Total: ${cluster.count}</p>
            <p>🟢 Disponibles: ${cluster.available}</p>
            <p>🔴 Vendus: ${cluster.sold}</p>
            <p>🟡 Indisponibles: ${cluster.unavailable}</p>
          </div>
        </div>
      `,
    });

    // Ajouter les événements de survol
    marker.addListener('mouseover', () => {
      infoWindow.open(map, marker);
    });

    marker.addListener('mouseout', () => {
      infoWindow.close();
    });

    // Zoom au clic
    marker.addListener('click', () => {
      map.setZoom(map.getZoom()! + 2);
      map.panTo(cluster.position);
    });

    return marker;
  };

  const createIndividualMarker = (parcel: Parcel, map: google.maps.Map) => {
    const marker = new google.maps.Marker({
      position: parcel.location,
      map: map,
      title: parcel.title,
      animation: google.maps.Animation.DROP,
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

    return marker;
  };

  const updateMarkers = (map: google.maps.Map) => {
    const zoom = map.getZoom() || 0;
    
    // Nettoyer les marqueurs existants
    markers.forEach(marker => marker.setMap(null));
    clusterMarkers.forEach(marker => marker.setMap(null));
    
    if (zoom >= 14) {
      // Afficher les marqueurs individuels
      const newMarkers = parcels.map(parcel => createIndividualMarker(parcel, map));
      setMarkers(newMarkers);
      setClusterMarkers([]);
    } else {
      // Créer des clusters
      const clusters: { [key: string]: MarkerCluster } = {};
      
      parcels.forEach(parcel => {
        const key = `${Math.round(parcel.location.lat * 100) / 100}_${Math.round(parcel.location.lng * 100) / 100}`;
        
        if (!clusters[key]) {
          clusters[key] = {
            position: new google.maps.LatLng(parcel.location.lat, parcel.location.lng),
            count: 0,
            available: 0,
            sold: 0,
            unavailable: 0,
            parcels: []
          };
        }
        
        clusters[key].count++;
        clusters[key].parcels.push(parcel);
        
        if (parcel.status === 'AVAILABLE') clusters[key].available++;
        else if (parcel.status === 'SOLD') clusters[key].sold++;
        else clusters[key].unavailable++;
      });

      const newClusterMarkers = Object.values(clusters).map(cluster => 
        createClusterMarker(cluster, map)
      );
      
      setMarkers([]);
      setClusterMarkers(newClusterMarkers);
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

          // Ajouter l'événement de zoom
          mapInstance.addListener('zoom_changed', () => {
            updateMarkers(mapInstance);
          });

          // Ajouter l'événement de déplacement
          mapInstance.addListener('dragend', () => {
            updateMarkers(mapInstance);
          });

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