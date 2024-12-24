import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, Receipt, Calculator } from "lucide-react";
import { Parcel } from "@/utils/mockData/types";

interface ParcelActionsProps {
  parcel: Parcel;
  onPaymentClick: () => void;
  onReceiptClick: () => void;
  onContactClick: () => void;
  onCalculatorClick: () => void;
}

export const ParcelActions = ({
  parcel,
  onPaymentClick,
  onReceiptClick,
  onContactClick,
  onCalculatorClick,
}: ParcelActionsProps) => {
  return (
    <>
      <div className="flex gap-2">
        <Button 
          className="flex-1"
          onClick={() => parcel.taxStatus === 'PAID' 
            ? onReceiptClick()
            : onPaymentClick()
          }
        >
          {parcel.taxStatus === 'PAID' ? (
            <>
              <Receipt className="w-4 h-4 mr-2" />
              Reçu
            </>
          ) : (
            <>
              <FileText className="w-4 h-4 mr-2" />
              Payer
            </>
          )}
        </Button>
        <Button 
          variant="outline"
          className="flex-1"
          onClick={onContactClick}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Contacter
        </Button>
      </div>

      <Button 
        variant="secondary"
        className="w-full"
        onClick={onCalculatorClick}
      >
        <Calculator className="w-4 h-4 mr-2" />
        Calculateur TNB
      </Button>
    </>
  );
};