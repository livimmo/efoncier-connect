import { useEffect, useRef, useState, useMemo } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useToast } from "@/hooks/use-toast";
import type { Parcel, Cluster } from '@/utils/mockData/types';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

const GOOGLE_MAPS_API_KEY = 'AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8';
const DEFAULT_CENTER = { lat: 33.5731, lng: -7.5898 }; // Casablanca
const DEFAULT_ZOOM = 12;

interface GoogleMapProps {
  onMarkerClick: (parcel: Parcel) => void;
  parcels: Parcel[];
  theme: 'light' | 'dark';
}

export const GoogleMap = ({ onMarkerClick, parcels, theme }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const { toast } = useToast();

  const createClusters = (parcels: Parcel[], zoom: number) => {
    if (zoom >= 14) return [];

    const cityGroups = parcels.reduce((acc, parcel) => {
      if (!acc[parcel.city]) {
        acc[parcel.city] = {
          parcels: [],
          center: parcel.location,
          totalArea: 0,
        };
      }
      acc[parcel.city].parcels.push(parcel);
      acc[parcel.city].totalArea += parcel.surface;
      return acc;
    }, {} as Record<string, { parcels: Parcel[], center: { lat: number, lng: number }, totalArea: number }>);

    return Object.entries(cityGroups).map(([city, data]) => ({
      id: city,
      center: data.center,
      count: data.parcels.length,
      parcels: data.parcels,
      city,
      totalArea: data.totalArea,
      averagePrice: Math.round(data.parcels.reduce((sum, p) => sum + p.surface * 1000, 0) / data.parcels.length),
    }));
  };

  const getClusterColor = (count: number) => {
    if (count <= 50) return '#22c55e'; // green-500
    if (count <= 200) return '#eab308'; // yellow-500
    return '#ef4444'; // red-500
  };

  const createClusterMarker = (cluster: Cluster, map: google.maps.Map) => {
    const color = getClusterColor(cluster.count);
    
    const marker = new google.maps.Marker({
      position: cluster.center,
      map: map,
      label: {
        text: cluster.count.toString(),
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: 'bold',
      },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: color,
        fillOpacity: 0.9,
        strokeWeight: 2,
        strokeColor: '#FFFFFF',
        scale: Math.max(30, Math.min(50, cluster.count / 4)),
      },
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div class="p-4 bg-white rounded-lg shadow-lg">
          <h3 class="font-semibold text-lg mb-2">${cluster.city}</h3>
          <p class="text-sm text-gray-600">Nombre de terrains: ${cluster.count}</p>
          <p class="text-sm text-gray-600">Surface totale: ${cluster.totalArea.toLocaleString()} m²</p>
          <p class="text-sm text-gray-600">Prix moyen: ${cluster.averagePrice.toLocaleString()} MAD</p>
        </div>
      `,
    });

    marker.addListener('mouseover', () => {
      infoWindow.open(map, marker);
    });

    marker.addListener('mouseout', () => {
      infoWindow.close();
    });

    marker.addListener('click', () => {
      map.setZoom(14);
      map.panTo(cluster.center);
    });

    return marker;
  };

  const createParcelMarker = (parcel: Parcel, map: google.maps.Map) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'PAID': return '#22c55e';
        case 'PENDING': return '#eab308';
        case 'OVERDUE': return '#ef4444';
        default: return '#6b7280';
      }
    };

    const getTypeIcon = (type: string) => {
      switch (type) {
        case 'RESIDENTIAL': return '🏠';
        case 'COMMERCIAL': return '🏢';
        case 'INDUSTRIAL': return '🏭';
        default: return '📍';
      }
    };

    const marker = new google.maps.Marker({
      position: parcel.location,
      map: map,
      title: parcel.title,
      animation: google.maps.Animation.DROP,
      label: {
        text: getTypeIcon(parcel.type),
        fontSize: '20px',
      },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: getStatusColor(parcel.taxStatus),
        fillOpacity: 0.7,
        strokeWeight: 2,
        strokeColor: '#FFFFFF',
        scale: 15,
      },
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div class="p-4 bg-white rounded-lg shadow-lg">
          <h3 class="font-semibold">${parcel.title}</h3>
          <p class="text-sm text-gray-600">TF: ${parcel.titleDeedNumber}</p>
          <p class="text-sm text-gray-600">Surface: ${parcel.surface} m²</p>
          <p class="text-sm text-gray-600">Type: ${parcel.type}</p>
          <p class="text-sm text-gray-600">Statut: ${parcel.taxStatus}</p>
        </div>
      `,
    });

    marker.addListener('mouseover', () => {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      infoWindow.open(map, marker);
    });

    marker.addListener('mouseout', () => {
      marker.setAnimation(null);
      infoWindow.close();
    });

    marker.addListener("click", () => {
      onMarkerClick(parcel);
    });

    return marker;
  };

  const updateMarkers = (map: google.maps.Map, zoom: number) => {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    const newMarkers: google.maps.Marker[] = [];
    
    if (zoom >= 14) {
      // Show individual parcels
      parcels.forEach(parcel => {
        const marker = createParcelMarker(parcel, map);
        newMarkers.push(marker);
      });
    } else {
      // Show clusters
      const newClusters = createClusters(parcels, zoom);
      setClusters(newClusters);
      
      newClusters.forEach(cluster => {
        const marker = createClusterMarker(cluster, map);
        newMarkers.push(marker);
      });
    }
    
    setMarkers(newMarkers);
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

          setMap(mapInstance);
          
          mapInstance.addListener('zoom_changed', () => {
            const zoom = mapInstance.getZoom();
            if (zoom) {
              updateMarkers(mapInstance, zoom);
            }
          });

          // Initial markers update
          updateMarkers(mapInstance, DEFAULT_ZOOM);

          toast({
            title: "Carte chargée",
            description: "La carte a été initialisée avec succès",
          });
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
      const zoom = map.getZoom();
      if (zoom) {
        updateMarkers(map, zoom);
      }
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