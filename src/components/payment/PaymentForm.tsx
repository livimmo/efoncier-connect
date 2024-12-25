import { useState } from "react";
import { CardPaymentForm } from "./CardPaymentForm";

interface PaymentFormProps {
  parcelId: string;
  hideHeader?: boolean;
}

export const PaymentForm = ({ parcelId, hideHeader }: PaymentFormProps) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    // Here you would typically handle the actual payment processing
  };

  return (
    <div className="space-y-6">
      {!hideHeader && (
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Paiement de la TNB
          </h2>
          <p className="text-sm text-muted-foreground">
            Référence Parcelle: {parcelId}
          </p>
        </div>
      )}
      <CardPaymentForm 
        amount={5000} 
        loading={loading} 
        onSubmit={handleSubmit}
      />
    </div>
  );
};