import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";
import { Parcel } from "@/utils/mockData/types";
import { UserRole } from "@/types/auth";

export interface GoogleMapProps {
  onMarkerClick: (parcel: Parcel, position: { x: number; y: number }) => void;
  parcels: Parcel[];
  theme: 'light' | 'dark';
  setMapInstance: (map: google.maps.Map) => void;
  userRole?: UserRole;
  getMarkerColor?: (status: string) => string;
}

const GoogleMap = ({ onMarkerClick, parcels, theme, setMapInstance, userRole, getMarkerColor }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "YOUR_API_KEY",
      version: "weekly",
    });

    loader.load().then(() => {
      const googleMap = new google.maps.Map(mapRef.current!, {
        center: { lat: 33.5731, lng: -7.5898 }, // Default center
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: theme === 'dark' ? [{ elementType: 'geometry', stylers: [{ color: '#212121' }] }] : [],
      });

      setMap(googleMap);
      setMapInstance(googleMap);
    });
  }, [theme, setMapInstance]);

  useEffect(() => {
    if (map) {
      parcels.forEach(parcel => {
        const marker = new google.maps.Marker({
          position: { lat: parcel.latitude, lng: parcel.longitude },
          map: map,
          title: parcel.titleDeedNumber,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: getMarkerColor ? getMarkerColor(parcel.status) : '#000',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#fff',
          },
        });

        marker.addListener("click", () => {
          onMarkerClick(parcel, { x: marker.getPosition()!.lng(), y: marker.getPosition()!.lat() });
        });
      });
    }
  }, [map, parcels, onMarkerClick, getMarkerColor]);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default GoogleMap;
