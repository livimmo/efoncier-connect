import { Parcel } from "@/utils/mockData/types";
import { formatCurrency } from "@/utils/format";
import { useState } from "react";
import { PropertyPopup } from "../property-popup/PropertyPopup";
import { PaymentDialog } from "./dialogs/PaymentDialog";
import { ReceiptDialog } from "./dialogs/ReceiptDialog";
import { RegisterDialog } from "@/components/auth/RegisterDialog";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { ParcelBasicInfo } from "./minimized/ParcelBasicInfo";
import { ParcelActions } from "./minimized/ParcelActions";
import { BlurredField } from "./minimized/BlurredField";

interface MinimizedParcelInfoProps {
  parcel: Parcel;
  onClose?: () => void;
}

export const MinimizedParcelInfo = ({ parcel, onClose }: MinimizedParcelInfoProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

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

  const handleBlurredClick = () => {
    setLoginOpen(true);
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

      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
      />

      <div className="bg-background/95 backdrop-blur-sm p-4 rounded-b-lg border border-t-0 border-border/50 min-w-[300px]">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start gap-4">
            <ParcelBasicInfo 
              parcel={parcel}
              onBlurredClick={handleBlurredClick}
            />
            <div className="text-right shrink-0">
              <div className="text-sm font-semibold whitespace-nowrap">
                <BlurredField
                  value={`${formatCurrency(parcel.tnbInfo.totalAmount)} DHS`}
                  onBlurredClick={handleBlurredClick}
                />
              </div>
              <div className="text-xs font-medium whitespace-nowrap text-muted-foreground">
                <BlurredField
                  value={parcel.ownerName}
                  onBlurredClick={handleBlurredClick}
                />
              </div>
              <ParcelActions 
                parcel={parcel}
                onPaymentClick={handlePaymentClick}
                onDetailsClick={() => setDialogOpen(true)}
                onRegisterClick={() => setRegisterOpen(true)}
                paymentStatus={paymentStatus}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};