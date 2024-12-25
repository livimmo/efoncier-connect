import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { Minimize2, Receipt, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/format";
import { ParcelInfoHeader } from "./parcel-info/ParcelInfoHeader";
import { ParcelDetails } from "./parcel-info/ParcelDetails";
import { ParcelActions } from "./parcel-info/ParcelActions";
import { ReceiptDialog } from "./parcel-info/dialogs/ReceiptDialog";
import { PaymentDialog } from "@/components/notifications/dialogs/PaymentDialog";
import type { Parcel } from "@/utils/mockData/types";

interface DraggableParcelInfoProps {
  parcel: Parcel;
  onClose: () => void;
  position?: { x: number; y: number };
}

export const DraggableParcelInfo = ({
  parcel,
  onClose,
  position,
}: DraggableParcelInfoProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const { profile } = useAuth();
  const dragRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const isOwner = profile?.id === parcel.ownerId;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      dragRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && cardRef.current) {
      const x = e.clientX - dragRef.current.x;
      const y = e.clientY - dragRef.current.y;
      cardRef.current.style.left = `${x}px`;
      cardRef.current.style.top = `${y}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handlePaymentClick = () => {
    setShowPayment(true);
  };

  const handleReceiptClick = () => {
    setShowReceipt(true);
  };

  return (
    <>
      <Card
        ref={cardRef}
        className={cn(
          "fixed z-50 min-w-[300px] max-w-md bg-background/95 backdrop-blur-sm shadow-lg",
          isDragging && "cursor-grabbing",
          isMinimized && "w-auto"
        )}
        style={{
          left: position?.x ?? "50%",
          top: position?.y ?? "50%",
          transform: position ? "none" : "translate(-50%, -50%)",
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <ParcelInfoHeader
          title={parcel.title}
          ownerName={parcel.ownerName}
          isMinimized={isMinimized}
          isDragging={isDragging}
          onToggleMinimize={() => setIsMinimized(!isMinimized)}
          onClose={onClose}
          onMouseDown={handleMouseDown}
        />

        {!isMinimized ? (
          <div className="p-4 space-y-4">
            <ParcelDetails parcel={parcel} />
            <ParcelActions
              parcel={parcel}
              onPaymentClick={handlePaymentClick}
              onReceiptClick={handleReceiptClick}
              onContactClick={() => {}}
              onCalculatorClick={() => {}}
            />
          </div>
        ) : (
          <div className="p-2 space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{parcel.surface} m²</p>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(parcel.tnbInfo.pricePerMeter)} DH/m²
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={handlePaymentClick}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Payer TNB
              </Button>
              {isOwner && parcel.taxStatus === 'PAID' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReceiptClick}
                >
                  <Receipt className="w-4 h-4 mr-2" />
                  Reçu
                </Button>
              )}
            </div>
          </div>
        )}
      </Card>

      <PaymentDialog
        open={showPayment}
        onOpenChange={setShowPayment}
        titleDeedNumber={parcel.titleDeedNumber}
        amount={parcel.tnbInfo.totalAmount}
      />

      {isOwner && (
        <ReceiptDialog
          open={showReceipt}
          onOpenChange={setShowReceipt}
          receiptData={{
            parcelId: parcel.id,
            amount: parcel.tnbInfo.totalAmount,
            date: parcel.tnbInfo.lastUpdate,
          }}
        />
      )}
    </>
  );
};