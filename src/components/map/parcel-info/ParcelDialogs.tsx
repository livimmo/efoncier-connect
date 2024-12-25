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
        />
      )}
      {activeDialog === "receipt" && (
        <ReceiptDialog 
          parcelId={parcelId} 
          onClose={onClose}
        />
      )}
    </>
  );
};