import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { Minimize2, Receipt, CreditCard, X, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/format";
import { ParcelInfoHeader } from "./parcel-info/ParcelInfoHeader";
import { ParcelDetails } from "./parcel-info/ParcelDetails";
import { ParcelActions } from "./parcel-info/ParcelActions";
import { ReceiptDialog } from "./parcel-info/dialogs/ReceiptDialog";
import { PaymentDialog } from "@/components/notifications/dialogs/PaymentDialog";
import type { Property } from "@/types";

interface DraggableParcelInfoProps {
  parcel: Property;
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const { profile } = useAuth();
  const dragRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const isOwner = profile?.id === parcel.owner_id;

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

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    setIsMinimized(false);
  };

  return (
    <>
      <Card
        ref={cardRef}
        className={cn(
          "fixed z-50 bg-background/95 backdrop-blur-sm shadow-lg transition-all duration-300 ease-in-out",
          isDragging && "cursor-grabbing",
          isMinimized ? "w-auto max-w-[300px]" : "min-w-[300px] max-w-md",
          isExpanded && "!max-w-2xl w-full",
          "hover:shadow-xl"
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
        <div
          className={cn(
            "flex items-center justify-between p-2 bg-primary text-primary-foreground rounded-t-lg",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}
          onMouseDown={handleMouseDown}
        >
          <h3 className="text-sm font-medium truncate flex-1">{parcel.title}</h3>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-primary-foreground/20"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-primary-foreground/20"
              onClick={handleToggleExpand}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-primary-foreground/20"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

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
                <p className="text-sm font-medium">{parcel.surface_area} m²</p>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(parcel.price)} DH/m²
                </p>
              </div>
              {parcel.taxStatus === 'PAID' ? (
                isOwner && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReceiptClick}
                  >
                    <Receipt className="w-4 h-4 mr-2" />
                    Reçu
                  </Button>
                )
              ) : (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handlePaymentClick}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payer TNB
                </Button>
              )}
            </div>
          </div>
        )}
      </Card>

      <PaymentDialog
        open={showPayment}
        onOpenChange={setShowPayment}
        titleDeedNumber={parcel.id}
        amount={parcel.price}
      />

      {isOwner && (
        <ReceiptDialog
          open={showReceipt}
          onOpenChange={setShowReceipt}
          receiptData={{
            parcelId: parcel.id,
            amount: parcel.price,
            date: new Date().toISOString(),
          }}
        />
      )}
    </>
  );
};