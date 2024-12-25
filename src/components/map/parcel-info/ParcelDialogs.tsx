import { PaymentDialog } from "@/components/notifications/dialogs/PaymentDialog";
import { ReceiptDialog } from "./dialogs/ReceiptDialog";
import type { Property } from "@/types";

interface ParcelDialogsProps {
  parcel: Property;
  showPayment: boolean;
  setShowPayment: (show: boolean) => void;
  showReceipt: boolean;
  setShowReceipt: (show: boolean) => void;
}

export const ParcelDialogs = ({
  parcel,
  showPayment,
  setShowPayment,
  showReceipt,
  setShowReceipt,
}: ParcelDialogsProps) => {
  return (
    <>
      <PaymentDialog
        open={showPayment}
        onOpenChange={setShowPayment}
        titleDeedNumber={parcel.titleDeedNumber}
        amount={parcel.tnbInfo.totalAmount}
      />

      <ReceiptDialog
        open={showReceipt}
        onOpenChange={setShowReceipt}
        receiptData={{
          referenceNumber: `TNB-${parcel.titleDeedNumber}`,
          date: new Date().toISOString(),
          taxpayer: {
            name: parcel.ownerName || "Propriétaire",
            fiscalId: parcel.titleDeedNumber,
          },
          parcel: {
            id: parcel.titleDeedNumber,
            location: parcel.address || "",
            area: parcel.surface_area,
            amount: parcel.tnbInfo.totalAmount,
            transactionRef: `TX-${parcel.id}`,
          },
        }}
      />
    </>
  );
};