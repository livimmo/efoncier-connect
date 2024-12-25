import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PaymentForm } from "@/components/payment/PaymentForm";

interface PaymentDialogProps {
  parcelId: string;
  hideHeader?: boolean;
  onClose?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const PaymentDialog = ({ 
  parcelId, 
  hideHeader, 
  onClose,
  open,
  onOpenChange 
}: PaymentDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange || onClose}>
      <DialogContent className="max-w-3xl">
        <PaymentForm parcelId={parcelId} hideHeader={hideHeader} />
      </DialogContent>
    </Dialog>
  );
};