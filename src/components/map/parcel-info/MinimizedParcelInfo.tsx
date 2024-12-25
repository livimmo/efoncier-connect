import { Button } from "@/components/ui/button";
import { Receipt, CreditCard } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import type { Property } from "@/types";

interface MinimizedParcelInfoProps {
  parcel: Property;
  isOwner: boolean;
  onReceiptClick: () => void;
  onPaymentClick: () => void;
}

export const MinimizedParcelInfo = ({
  parcel,
  isOwner,
  onReceiptClick,
  onPaymentClick,
}: MinimizedParcelInfoProps) => {
  return (
    <div className="p-2 space-y-2">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">{parcel.surface_area} m²</p>
          <p className="text-xs text-muted-foreground">
            {formatCurrency(parcel.price)} DH/m²
          </p>
        </div>
        {parcel.taxStatus === "PAID" ? (
          isOwner && (
            <Button variant="outline" size="sm" onClick={onReceiptClick}>
              <Receipt className="w-4 h-4 mr-2" />
              Reçu
            </Button>
          )
        ) : (
          isOwner && (
            <Button variant="destructive" size="sm" onClick={onPaymentClick}>
              <CreditCard className="w-4 h-4 mr-2" />
              Payer TNB
            </Button>
          )
        )}
      </div>
    </div>
  );
};