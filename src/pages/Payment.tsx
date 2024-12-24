import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { PaymentSummary } from "@/components/payment/PaymentSummary";
import { CardPaymentForm } from "@/components/payment/CardPaymentForm";
import { BankTransferInfo } from "@/components/payment/BankTransferInfo";
import { MobilePayment } from "@/components/payment/MobilePayment";
import { Header } from "@/components/Header";
import type { PaymentProps, PaymentDetails } from "@/components/payment/types";

const mockPayment: PaymentDetails = {
  id: "TF#123456",
  location: "Casablanca, Maarif",
  area: 3500,
  type: "Résidentiel",
  amount: 25000,
  dueDate: "2024-12-30",
  status: "pending"
};

const Payment = ({ parcelId }: PaymentProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Paiement réussi",
        description: "Votre paiement a été traité avec succès.",
        duration: 5000,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-6 max-w-4xl">
        <PaymentSummary payment={mockPayment} />
        
        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="card">Carte Bancaire</TabsTrigger>
            <TabsTrigger value="bank">Virement Bancaire</TabsTrigger>
            <TabsTrigger value="mobile">Paiement Mobile</TabsTrigger>
          </TabsList>

          <TabsContent value="card">
            <CardPaymentForm 
              amount={mockPayment.amount}
              loading={loading}
              onSubmit={handlePayment}
            />
          </TabsContent>

          <TabsContent value="bank">
            <BankTransferInfo referenceId={mockPayment.id} />
          </TabsContent>

          <TabsContent value="mobile">
            <MobilePayment />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Payment;