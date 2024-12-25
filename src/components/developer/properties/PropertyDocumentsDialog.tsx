import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Property } from "@/types";
import { PropertyDocuments } from "@/components/map/property-popup/PropertyDocuments";

interface PropertyDocumentsDialogProps {
  property: Property | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PropertyDocumentsDialog = ({
  property,
  open,
  onOpenChange,
}: PropertyDocumentsDialogProps) => {
  if (!property) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Documents du bien {property.title}</DialogTitle>
        </DialogHeader>
        <PropertyDocuments parcel={{
          id: property.id,
          title: property.title,
          titleDeedNumber: property.title,
          address: property.description,
          city: "Ville",
          surface: property.surface_area,
          type: property.property_type as any,
          zone: "URBAN",
          taxStatus: "PAID",
          ownerName: "Propriétaire",
          owner: property.owner_id,
          location: property.location,
          tnbInfo: {
            pricePerMeter: property.price,
            totalAmount: property.price * property.surface_area,
            lastUpdate: property.updated_at,
            status: "LOW"
          },
          price: property.price,
          status: "AVAILABLE",
          fiscalStatus: property.fiscal_status
        }} />
      </DialogContent>
    </Dialog>
  );
};