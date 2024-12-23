import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from "lucide-react";

interface ReceiptPreviewProps {
  data: {
    referenceNumber: string;
    date: string;
    taxpayer: {
      name: string;
      fiscalId: string;
    };
    parcel: {
      id: string;
      location: string;
      area: number;
      amount: number;
      transactionRef: string;
    };
  };
}

export const ReceiptPreview = ({ data }: ReceiptPreviewProps) => {
  return (
    <Card className="print:shadow-none">
      <CardHeader className="text-center border-b">
        <div className="mx-auto mb-4">
          {/* Logo placeholder */}
          <div className="w-24 h-24 bg-muted rounded-lg mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Administration Fiscale</p>
        </div>
        <CardTitle>Reçu Fiscal</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-green-600 mb-2">PAYÉ</div>
          <p className="text-sm text-muted-foreground">
            Ref: {data.referenceNumber}
          </p>
          <p className="text-sm text-muted-foreground">
            Date: {new Date(data.date).toLocaleString()}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Contribuable</h4>
            <p className="text-sm">{data.taxpayer.name}</p>
            <p className="text-sm text-muted-foreground">ID: {data.taxpayer.fiscalId}</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Détails de la Parcelle</h4>
            <p className="text-sm">{data.parcel.id}</p>
            <p className="text-sm text-muted-foreground">{data.parcel.location}</p>
            <p className="text-sm text-muted-foreground">{data.parcel.area} m²</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Paiement</h4>
            <p className="text-sm">Montant: {data.parcel.amount} MAD</p>
            <p className="text-sm text-muted-foreground">
              Transaction: {data.parcel.transactionRef}
            </p>
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <div className="text-center">
            <QrCode className="w-24 h-24 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">
              Scannez pour vérifier l'authenticité
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};