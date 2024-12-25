import { Parcel } from "@/utils/mockData/types";
import { useState } from "react";
import { PropertyPopup } from "../property-popup/PropertyPopup";
import { PaymentDialog } from "./dialogs/PaymentDialog";
import { ReceiptDialog } from "./dialogs/ReceiptDialog";
import { ParcelStatusInfo } from "./ParcelStatusInfo";
import { RegisterDialog } from "@/components/auth/RegisterDialog";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { useAuth } from "@/components/auth/AuthProvider";
import { ParcelHeader } from "./minimized/ParcelHeader";
import { ParcelActions } from "./minimized/ParcelActions";

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
  const { profile } = useAuth();

  const handleLoginClick = () => {
    setLoginOpen(true);
  };

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
          <ParcelHeader 
            parcel={parcel}
            userRole={profile?.role}
            onLoginClick={handleLoginClick}
          />
          
          <div className="mt-1">
            <ParcelStatusInfo 
              status={parcel.status}
              fiscalStatus={parcel.fiscalStatus}
              taxStatus={parcel.taxStatus}
            />
          </div>

          <div className="text-right shrink-0">
            <ParcelActions 
              parcel={parcel}
              userRole={profile?.role}
              onPaymentClick={handlePaymentClick}
              onDialogOpen={() => setDialogOpen(true)}
              onRegisterOpen={() => setRegisterOpen(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};