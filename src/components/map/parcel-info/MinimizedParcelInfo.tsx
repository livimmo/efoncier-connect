import { Parcel } from "@/utils/mockData/types";
import { formatCurrency } from "@/utils/format";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { PropertyPopup } from "../property-popup/PropertyPopup";
import { Check, X, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Payment from "@/pages/Payment";

interface MinimizedParcelInfoProps {
  parcel: Parcel;
}

export const MinimizedParcelInfo = ({ parcel }: MinimizedParcelInfoProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return {
          color: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
          text: 'Disponible',
          icon: Check
        };
      case 'SOLD':
        return {
          color: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
          text: 'Vendu',
          icon: X
        };
      default:
        return {
          color: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
          text: 'Indisponible',
          icon: AlertTriangle
        };
    }
  };

  const getFiscalStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLIANT':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'NON_COMPLIANT':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      default:
        return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20';
    }
  };

  const getPaymentStatusInfo = (status: string) => {
    switch (status) {
      case 'PAID':
        return {
          color: 'text-green-600 dark:text-green-500',
          text: 'Payé',
          buttonVariant: 'default' as const,
          buttonText: 'Voir Reçu'
        };
      case 'OVERDUE':
        return {
          color: 'text-red-600 dark:text-red-500',
          text: 'En retard',
          buttonVariant: 'destructive' as const,
          buttonText: 'Payer la TNB'
        };
      default:
        return {
          color: 'text-orange-600 dark:text-orange-500',
          text: 'En attente',
          buttonVariant: 'destructive' as const,
          buttonText: 'Payer la TNB'
        };
    }
  };

  const statusInfo = getStatusInfo(parcel.status);
  const StatusIcon = statusInfo.icon;
  const paymentStatus = getPaymentStatusInfo(parcel.taxStatus);

  return (
    <>
      <PropertyPopup 
        parcel={parcel}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />

      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-sm">
          <DialogTitle>Paiement de la Taxe TNB</DialogTitle>
          <div className="flex-1 overflow-y-auto pr-2">
            <Payment parcelId={parcel.id} />
          </div>
        </DialogContent>
      </Dialog>

      <div className="bg-background/95 backdrop-blur-sm p-4 rounded-b-lg border border-t-0 border-border/50 min-w-[300px]">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <Badge 
                variant="secondary"
                className={`mb-2 ${statusInfo.color}`}
                aria-label={`Statut du bien : ${statusInfo.text}`}
              >
                <StatusIcon className="w-3 h-3 mr-1" />
                {statusInfo.text}
              </Badge>
              <div className="flex flex-col">
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span>{parcel.surface} m² •</span>
                  <span>Zone {parcel.zone}</span>
                </div>
                <div className="text-xs font-medium text-red-600 dark:text-red-500">
                  {formatCurrency(parcel.tnbInfo.pricePerMeter)} DHS/m²
                </div>
                <Badge 
                  variant="secondary" 
                  className={`mt-1 w-fit ${getFiscalStatusColor(parcel.fiscalStatus)}`}
                >
                  <span className={paymentStatus.color}>{paymentStatus.text}</span>
                </Badge>
                <div className="text-xs text-muted-foreground mt-1">
                  TF: {parcel.titleDeedNumber}
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-sm font-semibold whitespace-nowrap">
                {formatCurrency(parcel.tnbInfo.totalAmount)} DHS
              </div>
              <div className="text-xs font-medium whitespace-nowrap text-muted-foreground">
                {parcel.ownerName}
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <Button 
                  variant={paymentStatus.buttonVariant}
                  size="sm"
                  onClick={() => setPaymentOpen(true)}
                  className="w-full"
                >
                  {paymentStatus.buttonText}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setDialogOpen(true)}
                >
                  Voir détails
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};