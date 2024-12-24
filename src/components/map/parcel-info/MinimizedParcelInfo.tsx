import { Parcel } from "@/utils/mockData/types";
import { formatCurrency } from "@/utils/format";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { PropertyPopup } from "../property-popup/PropertyPopup";
import { Check, X, AlertTriangle, Receipt, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Payment from "@/pages/Payment";

interface MinimizedParcelInfoProps {
  parcel: Parcel;
}

export const MinimizedParcelInfo = ({ parcel }: MinimizedParcelInfoProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);

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

  const getPaymentStatusInfo = (status: string) => {
    switch (status) {
      case 'PAID':
        return {
          color: 'text-green-600 dark:text-green-500',
          text: 'Payé',
          showReceipt: true
        };
      case 'OVERDUE':
        return {
          color: 'text-red-600 dark:text-red-500',
          text: 'En retard',
          showReceipt: false
        };
      default:
        return {
          color: 'text-orange-600 dark:text-orange-500',
          text: 'En attente',
          showReceipt: false
        };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return <Badge variant="secondary" className="bg-green-500/10 text-green-500">🟢 À Vendre</Badge>;
      case 'SOLD':
        return <Badge variant="secondary" className="bg-red-500/10 text-red-500">🔴 Vendu</Badge>;
      case 'UNAVAILABLE':
        return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">🟡 Indisponible</Badge>;
      default:
        return <Badge variant="secondary" className="bg-gray-500/10 text-gray-500">En attente</Badge>;
    }
  };

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
              {getStatusBadge(parcel.status)}
              <div className="flex flex-col mt-2">
                <div className="text-sm text-muted-foreground">N° Titre Foncier</div>
                <div className="text-sm font-medium">{parcel.titleDeedNumber}</div>
                <div className="text-sm text-muted-foreground">Propriétaire</div>
                <div className="text-sm font-medium">{parcel.ownerName}</div>
                <div className="text-sm text-muted-foreground">Surface</div>
                <div className="text-sm font-medium">{parcel.surface} m²</div>
                <div className="text-sm text-muted-foreground">Type</div>
                <div className="text-sm font-medium">{parcel.type}</div>
                <div className="text-sm text-muted-foreground">Zone</div>
                <div className="text-sm font-medium">{parcel.zone}</div>
                <div className="text-sm text-muted-foreground">Statut</div>
                <div className={`text-sm font-medium ${paymentStatus.color}`}>
                  {paymentStatus.text}
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
                {paymentStatus.showReceipt ? (
                  <Button 
                    variant="default"
                    size="sm"
                    onClick={() => setReceiptOpen(true)}
                    className="w-full"
                  >
                    <Receipt className="w-4 h-4 mr-2" />
                    Reçu
                  </Button>
                ) : (
                  <Button 
                    variant="default"
                    size="sm"
                    onClick={() => setPaymentOpen(true)}
                    className="w-full"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Payer la TNB
                  </Button>
                )}
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