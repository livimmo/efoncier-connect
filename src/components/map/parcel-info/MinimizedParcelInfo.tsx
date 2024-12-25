import { Parcel } from "@/utils/mockData/types";
import { formatCurrency } from "@/utils/format";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PropertyPopup } from "../property-popup/PropertyPopup";
import { PaymentDialog } from "./dialogs/PaymentDialog";
import { ReceiptDialog } from "./dialogs/ReceiptDialog";
import { ParcelStatusInfo } from "./ParcelStatusInfo";
import { RegisterDialog } from "@/components/auth/RegisterDialog";
import { useAuth } from "@/components/auth/AuthProvider";
import { Badge } from "@/components/ui/badge";
import { UserPlus } from "lucide-react";

interface MinimizedParcelInfoProps {
  parcel: Parcel;
  onClose?: () => void;
}

export const MinimizedParcelInfo = ({ parcel, onClose }: MinimizedParcelInfoProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const { profile } = useAuth();

  const getPaymentStatusInfo = (status: string) => {
    switch (status) {
      case 'PAID':
        return {
          buttonVariant: 'default' as const,
          buttonText: 'Reçu',
          buttonClass: 'bg-green-600 hover:bg-green-700'
        };
      default:
        return {
          buttonVariant: 'destructive' as const,
          buttonText: 'Payer la TNB',
          buttonClass: ''
        };
    }
  };

  const paymentStatus = getPaymentStatusInfo(parcel.taxStatus);

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

  const handlePaymentClick = () => {
    if (parcel.taxStatus === 'PAID') {
      setReceiptOpen(true);
    } else {
      setPaymentOpen(true);
    }
    if (onClose) {
      onClose();
    }
  };

  const handleDetailsClick = () => {
    if (!profile) {
      setRegisterOpen(true);
      return;
    }
    setDialogOpen(true);
  };

  return (
    <>
      <PropertyPopup 
        parcel={parcel}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />

      <PaymentDialog
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        parcelId={parcel.id}
      />

      <ReceiptDialog
        open={receiptOpen}
        onOpenChange={setReceiptOpen}
        receiptData={receiptData}
      />

      <RegisterDialog 
        open={registerOpen}
        onOpenChange={setRegisterOpen}
      />

      <div className="bg-background/95 backdrop-blur-sm p-4 rounded-b-lg border border-t-0 border-border/50 min-w-[300px]">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col">
                {parcel.status === 'AVAILABLE' && (
                  <Badge variant="success" className="w-fit mb-2">
                    🟢 Disponible
                  </Badge>
                )}
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span>{parcel.surface} m² •</span>
                  <span>Zone {parcel.zone}</span>
                </div>
                <div className="text-xs font-medium text-red-600 dark:text-red-500">
                  {formatCurrency(parcel.tnbInfo.pricePerMeter)} DHS/m²
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {profile ? (
                    `TF: ${parcel.titleDeedNumber}`
                  ) : (
                    'TF: XX-XXXXX (Connectez-vous pour voir)'
                  )}
                </div>
                <div className="mt-1">
                  <ParcelStatusInfo 
                    status={parcel.status}
                    fiscalStatus={parcel.fiscalStatus}
                    taxStatus={parcel.taxStatus}
                  />
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-sm font-semibold whitespace-nowrap">
                {formatCurrency(parcel.tnbInfo.totalAmount)} DHS
              </div>
              <div className="text-xs font-medium whitespace-nowrap text-muted-foreground">
                {profile ? parcel.ownerName : 'Propriétaire (Connectez-vous pour voir)'}
              </div>
              <div className="flex flex-col gap-2 mt-2">
                {profile ? (
                  <>
                    <Button 
                      variant={paymentStatus.buttonVariant}
                      size="sm"
                      onClick={handlePaymentClick}
                      className={`w-full ${paymentStatus.buttonClass}`}
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
                  </>
                ) : (
                  parcel.status === 'AVAILABLE' && (
                    <Button
                      size="sm"
                      onClick={() => setRegisterOpen(true)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Créer un compte promoteur
                    </Button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};