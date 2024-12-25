import { PaymentDialog } from "./dialogs/PaymentDialog";
import { ReceiptDialog } from "./dialogs/ReceiptDialog";

interface ParcelDialogsProps {
  parcelId: string;
  activeDialog: "payment" | "receipt" | null;
  onClose: () => void;
}

export const ParcelDialogs = ({ parcelId, activeDialog, onClose }: ParcelDialogsProps) => {
  if (!activeDialog) return null;

  return (
    <>
      {activeDialog === "payment" && (
        <PaymentDialog 
          parcelId={parcelId} 
          hideHeader={true} 
          onClose={onClose}
          open={true}
        />
      )}
      {activeDialog === "receipt" && (
        <ReceiptDialog 
          receiptData={{
            referenceNumber: `TNB-${parcelId}`,
            date: new Date().toISOString(),
            taxpayer: {
              name: "Propriétaire",
              fiscalId: parcelId,
            },
            parcel: {
              id: parcelId,
              location: "Location",
              area: 0,
              amount: 0,
              transactionRef: `TX-${parcelId}`,
            },
          }}
          open={true}
          onOpenChange={() => onClose()}
        />
      )}
    </>
  );
};