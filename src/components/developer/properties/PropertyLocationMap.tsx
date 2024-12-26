import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import type { Parcel } from "@/utils/mockData/types";

interface PropertyLocationMapProps {
  parcel: Parcel;
}

export function PropertyLocationMap({ parcel }: PropertyLocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const { Loader } = await import('@googlemaps/js-api-loader');
      const loader = new Loader({
        apiKey: 'AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8',
        version: 'weekly',
      });

      try {
        await loader.load();
        if (mapRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            center: parcel.location,
            zoom: 15,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
          });

          // Ajouter un marqueur pour la propriété
          new google.maps.Marker({
            position: parcel.location,
            map: map,
            title: parcel.title,
            animation: google.maps.Animation.DROP,
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
          <ExternalLink className="mr-2 h-4 w-4" />
          Ouvrir dans Google Maps
        </Button>
      </div>
    </Card>
  );
}