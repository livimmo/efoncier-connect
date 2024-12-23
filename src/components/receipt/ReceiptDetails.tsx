import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, MapPin, CreditCard, Calendar } from "lucide-react";

interface ReceiptDetailsProps {
  data: {
    taxpayer: {
      name: string;
      fiscalId: string;
      email: string;
      phone: string;
    };
    parcel: {
      id: string;
      location: string;
      area: number;
      amount: number;
      paymentMethod: string;
      dueDate: string;
      transactionRef: string;
    };
  };
}

export const ReceiptDetails = ({ data }: ReceiptDetailsProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Informations du Contribuable
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium">{data.taxpayer.name}</p>
            <p className="text-sm text-muted-foreground">ID: {data.taxpayer.fiscalId}</p>
          </div>
          <div>
            <p className="text-sm">{data.taxpayer.email}</p>
            <p className="text-sm">{data.taxpayer.phone}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Détails du Paiement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Titre Foncier</p>
              <p className="text-sm text-muted-foreground">{data.parcel.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Localisation</p>
              <p className="text-sm text-muted-foreground">{data.parcel.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Superficie</p>
              <p className="text-sm text-muted-foreground">{data.parcel.area} m²</p>
            </div>
            <div>
              <p className="text-sm font-medium">Montant Payé</p>
              <p className="text-sm text-muted-foreground">{data.parcel.amount} MAD</p>
            </div>
          </div>
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm">
                Payé par {data.parcel.paymentMethod}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm">
                Date d'échéance : {new Date(data.parcel.dueDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};