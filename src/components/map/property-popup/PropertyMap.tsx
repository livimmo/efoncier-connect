import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Parcel } from "@/utils/mockData/types";

interface PropertyMapProps {
  parcel: Parcel;
}

export function PropertyMap({ parcel }: PropertyMapProps) {
  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${parcel.location.lat},${parcel.location.lng}`;
    window.open(url, '_blank');
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="h-[400px] bg-muted">
        {/* La carte Google sera intégrée ici */}
      </div>
      <div className="absolute bottom-4 right-4">
        <Button onClick={openInGoogleMaps} className="shadow-lg">
          <MapPin className="mr-2 h-4 w-4" />
          Ouvrir dans Google Maps
        </Button>
      </div>
    </Card>
  );
}