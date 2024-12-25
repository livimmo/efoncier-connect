import { Parcel } from "@/utils/mockData/types";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { PropertyHeader } from "./minimized/PropertyHeader";
import { PropertyActions } from "./minimized/PropertyActions";
import { PropertyDialogs } from "./minimized/PropertyDialogs";

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
      <PropertyDialogs
        parcel={parcel}
        dialogOpen={dialogOpen}
        paymentOpen={paymentOpen}
        receiptOpen={receiptOpen}
        registerOpen={registerOpen}
        loginOpen={loginOpen}
        setDialogOpen={setDialogOpen}
        setPaymentOpen={setPaymentOpen}
        setReceiptOpen={setReceiptOpen}
        setRegisterOpen={setRegisterOpen}
        setLoginOpen={setLoginOpen}
      />

      <div className="bg-background/95 backdrop-blur-sm p-4 rounded-b-lg border border-t-0 border-border/50 min-w-[300px]">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start gap-4">
            <PropertyHeader 
              parcel={parcel}
              handleLoginClick={handleLoginClick}
            />
            <PropertyActions
              parcel={parcel}
              profile={profile}
              paymentStatus={paymentStatus}
              onRegisterClick={() => setRegisterOpen(true)}
              onPaymentClick={handlePaymentClick}
              onDetailsClick={() => setDialogOpen(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};