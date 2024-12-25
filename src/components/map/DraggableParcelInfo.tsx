import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthProvider";
import { cn } from "@/lib/utils";
import { ParcelInfoHeader } from "./parcel-info/ParcelInfoHeader";
import { ParcelDetails } from "./parcel-info/ParcelDetails";
import { ParcelActions } from "./parcel-info/ParcelActions";
import { MinimizedParcelInfo } from "./parcel-info/MinimizedParcelInfo";
import { ParcelDialogs } from "./parcel-info/ParcelDialogs";
import { ParcelHeader } from "./parcel-info/ParcelHeader";
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
  const [showReceipt, setShowReceipt] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const { profile } = useAuth();
  const dragRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const isOwner = profile?.role === "owner";

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

  return (
    <>
      <Card
        ref={cardRef}
        className={cn(
          "fixed z-50 bg-background/95 backdrop-blur-sm shadow-lg transition-all duration-300 ease-in-out",
          isDragging && "cursor-grabbing",
          isMinimized ? "w-auto max-w-[250px]" : "w-[300px]",
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
        <ParcelHeader
          title={parcel.title}
          isDragging={isDragging}
          isMinimized={isMinimized}
          setIsMinimized={setIsMinimized}
          handleToggleExpand={() => {}}
          onClose={onClose}
          onMouseDown={handleMouseDown}
        />

        {!isMinimized ? (
          <div className="p-3 space-y-3">
            <ParcelDetails parcel={parcel} compact />
            <ParcelActions
              parcel={parcel}
              onPaymentClick={() => setShowPayment(true)}
              onReceiptClick={() => setShowReceipt(true)}
              onContactClick={() => {}}
              onCalculatorClick={() => {}}
            />
          </div>
        ) : (
          <MinimizedParcelInfo
            parcel={parcel}
            isOwner={isOwner}
            onReceiptClick={() => setShowReceipt(true)}
            onPaymentClick={() => setShowPayment(true)}
          />
        )}
      </Card>

      {isOwner && (
        <ParcelDialogs
          parcel={parcel}
          showPayment={showPayment}
          setShowPayment={setShowPayment}
          showReceipt={showReceipt}
          setShowReceipt={setShowReceipt}
        />
      )}
    </>
  );
};