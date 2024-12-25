import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { CreditCard, Share2, MessageSquare, Receipt, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { PaymentDialog } from "@/components/notifications/dialogs/PaymentDialog";
import { LoginDialog } from "@/components/auth/LoginDialog";
import type { Property } from "@/types";

interface ParcelActionsProps {
  parcel: Property;
  onContactClick?: () => void;
  onCalculatorClick?: () => void;
  onPaymentClick?: () => void;
  onReceiptClick?: () => void;
  className?: string;
}

export function ParcelActions({ 
  parcel, 
  onContactClick,
  onCalculatorClick,
  onPaymentClick,
  onReceiptClick,
  className 
}: ParcelActionsProps) {
  const [showPayment, setShowPayment] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { profile } = useAuth();

  const handlePaymentClick = () => {
    if (profile && profile.role === "owner") {
      setShowPayment(true);
    } else {
      setShowLogin(true);
    }
  };

  const handleReceiptClick = () => {
    if (profile && profile.role === "owner") {
      onReceiptClick?.();
    } else {
      setShowLogin(true);
    }
  };

  return (
    <>
      <div className={cn("flex flex-wrap gap-2", className)}>
        {parcel.taxStatus === 'PAID' ? (
          <Button 
            className="flex-1"
            onClick={handleReceiptClick}
          >
            <Download className="mr-2 h-4 w-4" />
            Télécharger le reçu
          </Button>
        ) : (
          <Button 
            className="flex-1"
            onClick={handlePaymentClick}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Payer la TNB
          </Button>
        )}
        
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={onContactClick}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Contacter
        </Button>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      <PaymentDialog
        open={showPayment}
        onOpenChange={setShowPayment}
        titleDeedNumber={parcel.titleDeedNumber}
        amount={parcel.tnbInfo.totalAmount}
      />

      <LoginDialog 
        open={showLogin} 
        onOpenChange={setShowLogin}
      />
    </>
  );
}