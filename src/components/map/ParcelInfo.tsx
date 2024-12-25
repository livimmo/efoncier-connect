import { Card } from "../ui/card";
import { Parcel } from "@/utils/mockData/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ParcelDetails } from "./parcel-info/ParcelDetails";
import { ParcelActions } from "./parcel-info/ParcelActions";
import { ParcelDialogs } from "./parcel-info/ParcelDialogs";
import { UserRole } from "@/types/auth";

interface ParcelInfoProps {
  parcel: Parcel;
  onClose: () => void;
  className?: string;
  userRole?: UserRole;
}

export const ParcelInfo = ({ parcel, onClose, className, userRole }: ParcelInfoProps) => {
  const [contactOpen, setContactOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);

  // Mock receipt data based on parcel info
  const receiptData = {
    referenceNumber: `TNB-${parcel.id}`,
    date: new Date().toISOString(),
    taxpayer: {
      name: parcel.ownerName,
      fiscalId: parcel.titleDeedNumber,
    },
    parcel: {
      id: parcel.id,
      location: parcel.address,
      area: parcel.surface,
      amount: parcel.tnbInfo.totalAmount,
      transactionRef: `TX-${parcel.id}`,
    },
  };

  return (
    <>
      <ParcelDialogs
        parcel={parcel}
        paymentOpen={paymentOpen}
        receiptOpen={receiptOpen}
        contactOpen={contactOpen}
        calculatorOpen={calculatorOpen}
        setPaymentOpen={setPaymentOpen}
        setReceiptOpen={setReceiptOpen}
        setContactOpen={setContactOpen}
        setCalculatorOpen={setCalculatorOpen}
        receiptData={receiptData}
      />

      {!paymentOpen && !receiptOpen && (
        <Card className={cn("w-80 p-4 space-y-4 z-50 bg-background/95 backdrop-blur-sm", className)}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{parcel.title}</h3>
              <p className="text-sm text-muted-foreground">{parcel.address}</p>
            </div>
          </div>

          <ParcelDetails parcel={parcel} />

          <ParcelActions
            parcel={parcel}
            onPaymentClick={() => setPaymentOpen(true)}
            onReceiptClick={() => setReceiptOpen(true)}
            onContactClick={() => setContactOpen(true)}
            onCalculatorClick={() => setCalculatorOpen(true)}
          />
        </Card>
      )}
    </>
  );
};