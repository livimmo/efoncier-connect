import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Parcel } from "@/utils/mockData/types";
import { FileText, MessageSquare, Receipt, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ContactDialog } from "./contact/ContactDialog";
import { TNBCalculator } from "./tnb/TNBCalculator";
import { formatCurrency } from "@/utils/format";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { ReceiptPreview } from "../receipt/ReceiptPreview";
import Payment from "@/pages/Payment";

interface ParcelInfoProps {
  parcel: Parcel;
  onClose: () => void;
  className?: string;
}

export const ParcelInfo = ({ parcel, onClose, className }: ParcelInfoProps) => {
  const [contactOpen, setContactOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);

  const getTNBStatusColor = (status: 'LOW' | 'AVERAGE' | 'HIGH') => {
    switch (status) {
      case 'LOW':
        return 'text-green-600';
      case 'AVERAGE':
        return 'text-yellow-600';
      case 'HIGH':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  // Mock receipt data based on parcel info
  const receiptData = {
    referenceNumber: `TNB-${parcel.id}`,
    date: new Date().toISOString(),
    taxpayer: {
      name: parcel.ownerName,
      fiscalId: parcel.titleDeedNumber,
    },
    parcel: {
      id: parcel.id,
      location: parcel.address,
      area: parcel.surface,
      amount: parcel.tnbInfo.totalAmount,
      transactionRef: `TX-${parcel.id}`,
    },
  };

  return (
    <>
      <Card className={cn("w-80 p-4 space-y-4 z-50 bg-background/95 backdrop-blur-sm", className)}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{parcel.title}</h3>
            <p className="text-sm text-muted-foreground">{parcel.address}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">N° Titre Foncier</span>
            <span className="text-sm font-medium">{parcel.titleDeedNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Propriétaire</span>
            <span className="text-sm font-medium">{parcel.ownerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Surface</span>
            <span className="text-sm font-medium">{parcel.surface} m²</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Type</span>
            <span className="text-sm font-medium">{parcel.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Zone</span>
            <span className="text-sm font-medium">{parcel.zone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Statut</span>
            <span className={`text-sm font-medium ${
              parcel.taxStatus === 'PAID' 
                ? 'text-green-600' 
                : parcel.taxStatus === 'OVERDUE' 
                ? 'text-red-600' 
                : 'text-orange-600'
            }`}>
              {parcel.taxStatus === 'PAID' 
                ? 'Payé' 
                : parcel.taxStatus === 'OVERDUE' 
                ? 'En retard' 
                : 'En attente'}
            </span>
          </div>

          {/* TNB Information */}
          <div className="pt-2 border-t">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Prix TNB</span>
              <span className={`text-sm font-medium ${getTNBStatusColor(parcel.tnbInfo.status)}`}>
                {formatCurrency(parcel.tnbInfo.pricePerMeter)} DHS/m²
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total TNB Annuel</span>
              <span className="text-sm font-medium">
                {formatCurrency(parcel.tnbInfo.totalAmount)} DHS
              </span>
            </div>
            <div className="text-xs text-muted-foreground text-right mt-1">
              Dernière mise à jour : {new Date(parcel.tnbInfo.lastUpdate).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            className="flex-1"
            onClick={() => parcel.taxStatus === 'PAID' 
              ? setReceiptOpen(true)
              : setPaymentOpen(true)
            }
          >
            {parcel.taxStatus === 'PAID' ? (
              <>
                <Receipt className="w-4 h-4 mr-2" />
                Reçu
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Payer
              </>
            )}
          </Button>
          <Button 
            variant="outline"
            className="flex-1"
            onClick={() => setContactOpen(true)}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Contacter
          </Button>
        </div>

        <Button 
          variant="secondary"
          className="w-full"
          onClick={() => setCalculatorOpen(true)}
        >
          <Calculator className="w-4 h-4 mr-2" />
          Calculateur TNB
        </Button>
      </Card>

      <ContactDialog
        parcel={parcel}
        open={contactOpen}
        onOpenChange={setContactOpen}
      />

      <TNBCalculator
        parcel={parcel}
        open={calculatorOpen}
        onOpenChange={setCalculatorOpen}
      />

      {/* Payment Dialog */}
      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-sm">
          <DialogTitle>Paiement de la Taxe TNB</DialogTitle>
          <div className="flex-1 overflow-y-auto pr-2">
            <Payment parcelId={parcel.id} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Receipt Dialog */}
      <Dialog open={receiptOpen} onOpenChange={setReceiptOpen}>
        <DialogContent className="max-w-2xl h-[80vh] overflow-y-auto bg-background/95 backdrop-blur-sm">
          <DialogTitle>Reçu de Paiement</DialogTitle>
          <div className="flex-1 overflow-y-auto pr-2">
            <ReceiptPreview data={receiptData} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};