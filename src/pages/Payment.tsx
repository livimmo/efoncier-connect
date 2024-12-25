import { PaymentSteps } from "@/components/payment/PaymentSteps";
import { PaymentHeader } from "@/components/payment/PaymentHeader";
import { PaymentSummary } from "@/components/payment/PaymentSummary";
import { useSearchParams } from "react-router-dom";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const parcelId = searchParams.get("parcel");

  return (
    <div className="container mx-auto p-6 space-y-8">
      <PaymentHeader />
      
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <PaymentSteps parcelId={parcelId} />
        <PaymentSummary 
          payment={{
            id: parcelId || "TF-12345",
            location: "Casablanca, Ain Sebaa",
            area: 500,
            type: "Non Bâti",
            amount: 15000,
            dueDate: "2024-12-30",
            status: "pending"
          }}
        />
      </div>
    </div>
  );
};

export default Payment;