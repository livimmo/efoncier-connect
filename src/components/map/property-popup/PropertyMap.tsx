import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Parcel } from "@/utils/mockData/types";
import { Loader } from '@googlemaps/js-api-loader';

interface PropertyMapProps {
  parcel: Parcel;
}

export function PropertyMap({ parcel }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8',
        version: 'weekly',
      });

      try {
        const google = await loader.load();
        if (mapRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            center: parcel.location,
            zoom: 15,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            styles: [
              { featureType: "all", elementType: "labels.text.fill", stylers: [{ color: "#7c93a3" }] },
              { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#E3F2FD" }] },
              { featureType: "landscape", elementType: "geometry.fill", stylers: [{ color: "#F5F5F5" }] },
            ],
          });

          // Ajouter un marqueur pour la propriété
          new google.maps.Marker({
            position: parcel.location,
            map: map,
            title: parcel.title,
            animation: google.maps.Animation.DROP,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: parcel.taxStatus === 'PAID' ? '#006233' : '#C1272D',
              fillOpacity: 1,
              strokeWeight: 1,
              strokeColor: '#FFFFFF',
              scale: 8,
            },
          });
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la carte:", error);
      }
    };

    initMap();
  }, [parcel]);

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${parcel.location.lat},${parcel.location.lng}`;
    window.open(url, '_blank');
  };

  return (
    <Card className="relative overflow-hidden">
      <div ref={mapRef} className="h-[400px]" />
      <div className="absolute bottom-4 right-4">
        <Button onClick={openInGoogleMaps} className="shadow-lg">
          <MapPin className="mr-2 h-4 w-4" />
          Ouvrir dans Google Maps
        </Button>
      </div>
    </Card>
  );
}