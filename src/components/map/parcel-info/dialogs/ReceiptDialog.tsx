import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ReceiptPreview } from "@/components/receipt/ReceiptPreview";

interface ReceiptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receiptData: any;
}

export const ReceiptDialog = ({ open, onOpenChange, receiptData }: ReceiptDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[90vh] md:h-[95vh] w-[95vw] md:w-auto overflow-y-auto bg-background/95 backdrop-blur-sm z-[9999]">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle>Reçu de Paiement TNB</DialogTitle>
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
          <ReceiptPreview data={receiptData} />
        </div>
      </DialogContent>
    </Dialog>
  );
};