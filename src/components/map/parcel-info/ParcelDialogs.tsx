import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ContactDialog } from "../contact/ContactDialog";
import { TNBCalculator } from "../tnb/TNBCalculator";
import { ReceiptPreview } from "@/components/receipt/ReceiptPreview";
import Payment from "@/pages/Payment";
import { Parcel } from "@/utils/mockData/types";

interface ParcelDialogsProps {
  parcel: Parcel;
  paymentOpen: boolean;
  receiptOpen: boolean;
  contactOpen: boolean;
  calculatorOpen: boolean;
  setPaymentOpen: (open: boolean) => void;
  setReceiptOpen: (open: boolean) => void;
  setContactOpen: (open: boolean) => void;
  setCalculatorOpen: (open: boolean) => void;
  receiptData: any;
}

export const ParcelDialogs = ({
  parcel,
  paymentOpen,
  receiptOpen,
  contactOpen,
  calculatorOpen,
  setPaymentOpen,
  setReceiptOpen,
  setContactOpen,
  setCalculatorOpen,
  receiptData,
}: ParcelDialogsProps) => {
  return (
    <>
      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-sm z-[9999]">
          <div className="flex-1 overflow-y-auto pr-2">
            <Payment parcelId={parcel.id} hideHeader />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={receiptOpen} onOpenChange={setReceiptOpen}>
        <DialogContent className="max-w-2xl h-[80vh] overflow-y-auto bg-background/95 backdrop-blur-sm z-[9999]">
          <div className="flex-1 overflow-y-auto pr-2">
            <ReceiptPreview data={receiptData} />
          </div>
        </DialogContent>
      </Dialog>

      <ContactDialog
        parcel={parcel}
        open={contactOpen}
        onOpenChange={setContactOpen}
      />

      <TNBCalculator
        parcel={parcel}
        open={calculatorOpen}
        onOpenChange={setCalculatorOpen}
      />
    </>
  );
};