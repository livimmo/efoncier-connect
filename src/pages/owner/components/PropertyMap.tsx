import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { GoogleMap } from "@/components/map/GoogleMap";
import { useState } from "react";
import { mockParcels } from "@/utils/mockData/parcels";

export const PropertyMap = () => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Mes Biens</h3>
        <Button variant="outline" size="sm" className="gap-2">
          <MapPin className="h-4 w-4" />
          Vue Complète
        </Button>
      </div>
      
      <div className="h-[400px] relative rounded-lg overflow-hidden border">
        <GoogleMap
          parcels={mockParcels}
          onMarkerClick={() => {}}
          theme="light"
          setMapInstance={setMapInstance}
        />
      </div>
    </div>
  );
};