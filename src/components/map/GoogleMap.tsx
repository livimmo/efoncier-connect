import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import type { Parcel } from '@/utils/mockData/types';
import { UserRole } from '@/types/auth';
import { Check, AlertTriangle, X } from 'lucide-react';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8';

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

const GoogleMap = ({ 
  onMarkerClick, 
  parcels, 
  theme, 
  setMapInstance,
  userRole,
  center = { lat: 33.5731, lng: -7.5898 },
  zoom = 12,
  getMarkerColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return '#10B981'; // Green
      case 'IN_TRANSACTION':
        return '#F59E0B'; // Orange
      case 'SOLD':
        return '#EF4444'; // Red
      default:
        return '#6B7280'; // Gray
    }
  }
}: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return Check;
      case 'IN_TRANSACTION':
        return AlertTriangle;
      case 'SOLD':
        return X;
      default:
        return AlertTriangle;
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
            center,
            zoom,
            styles: theme === 'dark' ? [
              { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            ] : [],
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
          });

          setMapInstance(mapInstance);

          // Create markers for each parcel
          parcels.forEach(parcel => {
            const marker = new google.maps.Marker({
              position: parcel.location,
              map: mapInstance,
              title: parcel.title,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: getMarkerColor(parcel.status),
                fillOpacity: 1,
                strokeWeight: 1,
                strokeColor: '#FFFFFF',
                scale: 8,
              },
            });

            // Add hover effect with info window
            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div class="p-2">
                  <p><strong>Superficie:</strong> ${parcel.surface} m²</p>
                  <p><strong>Localisation:</strong> ${parcel.city}</p>
                  <p><strong>Statut Fiscal:</strong> ${parcel.fiscalStatus}</p>
                </div>
              `,
            });

            marker.addListener('mouseover', () => {
              infoWindow.open(mapInstance, marker);
            });

            marker.addListener('mouseout', () => {
              infoWindow.close();
            });

            marker.addListener('click', () => {
              const position = getMarkerPixelPosition(marker, mapInstance);
              onMarkerClick(parcel, position);
            });
          });
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, [parcels, theme, center, zoom]);

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

      return {
        x: pixelOffset.x,
        y: pixelOffset.y
      };
    }
    
    return { x: 0, y: 0 };
  };

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full min-h-[500px] rounded-lg"
    />
  );
};

export default GoogleMap;