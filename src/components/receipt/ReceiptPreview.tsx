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
    <Card className="max-w-md mx-auto bg-white print:shadow-none">
      <CardHeader className="text-center border-b relative pb-8">
        <div className="mx-auto mb-4">
          <div className="w-20 h-20 bg-muted rounded-lg mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Administration Fiscale</p>
        </div>
        <CardTitle className="text-xl">Reçu Fiscal</CardTitle>
        {/* Ticket-style notches */}
        <div className="absolute -bottom-2 left-0 w-full flex justify-between px-4">
          <div className="w-4 h-4 bg-background rounded-full -mb-2" />
          <div className="w-4 h-4 bg-background rounded-full -mb-2" />
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="text-center mb-6">
          <div className="text-xl font-bold text-green-600 mb-2">PAYÉ</div>
          <p className="text-sm text-muted-foreground">
            Ref: {data.referenceNumber}
          </p>
          <p className="text-sm text-muted-foreground">
            Date: {new Date(data.date).toLocaleString()}
          </p>
        </div>

        <div className="space-y-4 border-t border-dashed pt-4">
          <div>
            <h4 className="font-medium text-sm mb-2">Contribuable</h4>
            <p className="text-sm">{data.taxpayer.name}</p>
            <p className="text-xs text-muted-foreground">ID: {data.taxpayer.fiscalId}</p>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-2">Détails de la Parcelle</h4>
            <p className="text-sm">{data.parcel.id}</p>
            <p className="text-xs text-muted-foreground">{data.parcel.location}</p>
            <p className="text-xs text-muted-foreground">{data.parcel.area} m²</p>
          </div>

          <div className="border-t border-dashed pt-4">
            <h4 className="font-medium text-sm mb-2">Paiement</h4>
            <div className="flex justify-between items-center">
              <span className="text-sm">Montant:</span>
              <span className="text-lg font-bold">{data.parcel.amount} MAD</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Transaction: {data.parcel.transactionRef}
            </p>
          </div>
        </div>

        <div className="flex justify-center pt-4 border-t border-dashed">
          <div className="text-center">
            <QrCode className="w-20 h-20 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">
              Scannez pour vérifier l'authenticité
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};