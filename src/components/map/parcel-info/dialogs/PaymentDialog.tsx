import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PaymentForm } from "@/components/payment/PaymentForm";

interface PaymentDialogProps {
  parcelId: string;
  hideHeader?: boolean;
  onClose?: () => void;
}

export const PaymentDialog = ({ parcelId, hideHeader, onClose }: PaymentDialogProps) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <PaymentForm parcelId={parcelId} hideHeader={hideHeader} />
      </DialogContent>
    </Dialog>
  );
};