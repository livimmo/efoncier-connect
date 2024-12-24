import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Printer, Share2, Mail, MessageSquare, X } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

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
  onClose?: () => void;
}

export const ReceiptPreview = ({ data, onClose }: ReceiptPreviewProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = `Reçu Fiscal - Ref: ${data.referenceNumber}\nMontant: ${data.parcel.amount} MAD\nParcelle: ${data.parcel.id}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleEmailShare = () => {
    const subject = `Reçu Fiscal - Ref: ${data.referenceNumber}`;
    const body = `Reçu Fiscal\n\nRéférence: ${data.referenceNumber}\nDate: ${new Date(data.date).toLocaleString()}\n\nMontant: ${data.parcel.amount} MAD\nParcelle: ${data.parcel.id}\nLocalisation: ${data.parcel.location}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Card className={`bg-white print:shadow-none mx-auto ${isMobile ? 'w-[95%]' : 'w-[400px]'} h-auto`}>
      <CardHeader className="text-center border-b relative pb-6">
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 print:hidden"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <div className="mx-auto mb-3">
          <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Administration Fiscale</p>
        </div>
        <CardTitle className="text-xl">Reçu Fiscal</CardTitle>
        {/* Ticket-style notches */}
        <div className="absolute -bottom-2 left-0 w-full flex justify-between px-4">
          <div className="w-4 h-4 bg-background rounded-full -mb-2" />
          <div className="w-4 h-4 bg-background rounded-full -mb-2" />
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="text-center mb-4">
          <div className="text-xl font-bold text-green-600 mb-2">PAYÉ</div>
          <p className="text-sm text-muted-foreground">
            Ref: {data.referenceNumber}
          </p>
          <p className="text-sm text-muted-foreground">
            Date: {new Date(data.date).toLocaleString()}
          </p>
        </div>

        <div className="space-y-3 border-t border-dashed pt-3">
          <div>
            <h4 className="font-medium text-sm mb-1">Contribuable</h4>
            <p className="text-sm">{data.taxpayer.name}</p>
            <p className="text-xs text-muted-foreground">ID: {data.taxpayer.fiscalId}</p>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-1">Détails de la Parcelle</h4>
            <p className="text-sm">{data.parcel.id}</p>
            <p className="text-xs text-muted-foreground">{data.parcel.location}</p>
            <p className="text-xs text-muted-foreground">{data.parcel.area} m²</p>
          </div>

          <div className="border-t border-dashed pt-3">
            <h4 className="font-medium text-sm mb-1">Paiement</h4>
            <div className="flex justify-between items-center">
              <span className="text-sm">Montant:</span>
              <span className="text-lg font-bold">{data.parcel.amount} MAD</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Transaction: {data.parcel.transactionRef}
            </p>
          </div>
        </div>

        <div className="flex justify-center pt-3 border-t border-dashed">
          <div className="text-center">
            <QrCode className="w-16 h-16 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">
              Scannez pour vérifier l'authenticité
            </p>
          </div>
        </div>

        {/* Actions buttons - hidden when printing */}
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2 justify-center print:hidden border-t border-dashed pt-3`}>
          <Button variant="outline" size="sm" onClick={handlePrint} className={isMobile ? 'w-full' : ''}>
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
          <Button variant="outline" size="sm" onClick={handleWhatsAppShare} className={isMobile ? 'w-full' : ''}>
            <MessageSquare className="mr-2 h-4 w-4" />
            WhatsApp
          </Button>
          <Button variant="outline" size="sm" onClick={handleEmailShare} className={isMobile ? 'w-full' : ''}>
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};