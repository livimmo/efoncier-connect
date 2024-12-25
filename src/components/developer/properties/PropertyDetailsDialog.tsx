import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/types";
import { formatCurrency } from "@/utils/format";
import { Card } from "@/components/ui/card";

interface PropertyDetailsDialogProps {
  property: Property;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PropertyDetailsDialog = ({
  property,
  open,
  onOpenChange,
}: PropertyDetailsDialogProps) => {
  const details = [
    { label: "Numéro TF", value: property.title },
    { label: "Localisation", value: property.description },
    { label: "Superficie", value: `${property.surface_area.toLocaleString()} m²` },
    { label: "Type de bien", value: property.property_type },
    { label: "Prix au m²", value: `${formatCurrency(property.price)} DHS` },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between gap-4">
            <DialogTitle>Détails du bien</DialogTitle>
            <div className="flex gap-2">
              <Badge
                variant={
                  property.status === "available"
                    ? "success"
                    : property.status === "unavailable"
                    ? "destructive"
                    : "warning"
                }
              >
                {property.status === "available"
                  ? "Disponible"
                  : property.status === "unavailable"
                  ? "Indisponible"
                  : "En Transaction"}
              </Badge>
              <Badge
                variant={property.fiscal_status === "compliant" ? "success" : "destructive"}
              >
                {property.fiscal_status === "compliant" ? "Payé" : "Impayé"}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <Card className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {details.map((detail, index) => (
              <div key={index} className="space-y-1">
                <p className="text-sm text-muted-foreground">{detail.label}</p>
                <p className="font-medium">{detail.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};