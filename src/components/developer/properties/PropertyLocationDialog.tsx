import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GoogleMap } from "@/components/map/GoogleMap";
import { useState } from "react";
import { Property } from "@/types";

interface PropertyLocationDialogProps {
  property: Property;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PropertyLocationDialog = ({ property, open, onOpenChange }: PropertyLocationDialogProps) => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Localisation du bien {property.title}</DialogTitle>
        </DialogHeader>
        <div className="h-[500px] relative">
          <GoogleMap
            onMarkerClick={() => {}}
            parcels={[{
              id: property.id,
              title: property.title,
              location: property.location,
              status: "AVAILABLE",
              taxStatus: "PAID",
              type: property.property_type,
              surface: property.surface_area,
              price: property.price,
              owner: property.owner_id,
              address: "",
              titleDeedNumber: "",
              tnbInfo: {
                pricePerMeter: 0,
                lastPaymentDate: new Date(),
                status: "PAID"
              }
            }]}
            theme="light"
            setMapInstance={setMapInstance}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};