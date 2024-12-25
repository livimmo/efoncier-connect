import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Payment from "@/pages/Payment";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parcelId: string;
}

export const PaymentDialog = ({ open, onOpenChange, parcelId }: PaymentDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] md:h-[95vh] w-[95vw] md:w-auto overflow-y-auto bg-background/95 backdrop-blur-sm z-[9999]">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle>Paiement de la Taxe TNB</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto pr-2">
          <Payment parcelId={parcelId} hideHeader />
        </div>
      </DialogContent>
    </Dialog>
  );
};