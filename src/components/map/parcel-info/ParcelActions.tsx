import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, Receipt, Calculator, CreditCard } from "lucide-react";
import type { Property } from "@/types";

interface ParcelActionsProps {
  parcel: Property;
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
          onClick={parcel.taxStatus === 'PAID' ? onReceiptClick : onPaymentClick}
        >
          {parcel.taxStatus === 'PAID' ? (
            <>
              <Receipt className="w-4 h-4 mr-2" />
              Reçu
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              Payer TNB
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