import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Parcel } from "@/utils/mockData/types";
import { formatCurrency } from "@/utils/format";

interface PropertyDetailsProps {
  parcel: Parcel;
}

export function PropertyDetails({ parcel }: PropertyDetailsProps) {
  const details = [
    { label: "Numéro TF", value: parcel.titleDeedNumber },
    { label: "Localisation", value: `${parcel.city}, ${parcel.address}` },
    { label: "Superficie", value: `${parcel.surface.toLocaleString()} m²` },
    { label: "Zone", value: parcel.zone },
    { label: "Type", value: parcel.type },
    { label: "Prix TNB", value: `${formatCurrency(parcel.tnbInfo.pricePerMeter)} MAD/m²` },
    { label: "Total TNB", value: `${formatCurrency(parcel.tnbInfo.totalAmount)} MAD` },
  ];

  return (
    <Card className="p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {details.map((detail, index) => (
          <div key={index} className="space-y-1">
            <p className="text-sm text-muted-foreground">{detail.label}</p>
            <p className="font-medium">{detail.value}</p>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t">
        <h4 className="font-medium mb-2">Informations Propriétaire</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Nom</p>
            <p className="font-medium">{parcel.ownerName}</p>
          </div>
          {parcel.phone && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Téléphone</p>
              <p className="font-medium">{parcel.phone}</p>
            </div>
          )}
          {parcel.email && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{parcel.email}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}