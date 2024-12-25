import { Parcel } from "@/utils/mockData/types";
import { PropertyPopup } from "../../property-popup/PropertyPopup";
import { PaymentDialog } from "../dialogs/PaymentDialog";
import { ReceiptDialog } from "../dialogs/ReceiptDialog";
import { RegisterDialog } from "@/components/auth/RegisterDialog";
import { LoginDialog } from "@/components/auth/LoginDialog";

interface PropertyDialogsProps {
  parcel: Parcel;
  dialogOpen: boolean;
  paymentOpen: boolean;
  receiptOpen: boolean;
  registerOpen: boolean;
  loginOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  setPaymentOpen: (open: boolean) => void;
  setReceiptOpen: (open: boolean) => void;
  setRegisterOpen: (open: boolean) => void;
  setLoginOpen: (open: boolean) => void;
}

export const PropertyDialogs = ({
  parcel,
  dialogOpen,
  paymentOpen,
  receiptOpen,
  registerOpen,
  loginOpen,
  setDialogOpen,
  setPaymentOpen,
  setReceiptOpen,
  setRegisterOpen,
  setLoginOpen,
}: PropertyDialogsProps) => {
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
        receiptData={{
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
        }}
      />

      <RegisterDialog 
        open={registerOpen}
        onOpenChange={setRegisterOpen}
      />

      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
      />
    </>
  );
};