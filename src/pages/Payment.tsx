import { PaymentHeader } from "@/components/payment/PaymentHeader";
import { PropertySelection } from "@/components/payment/PropertySelection";
import { CardPaymentForm } from "@/components/payment/CardPaymentForm";
import { BankTransferInfo } from "@/components/payment/BankTransferInfo";
import { MobilePayment } from "@/components/payment/MobilePayment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Building2, Wallet } from "lucide-react";

const Payment = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <PaymentHeader />
      
      <div className="grid gap-6">
        <PropertySelection />
        
        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="card" className="space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>Carte Bancaire</span>
            </TabsTrigger>
            <TabsTrigger value="bank" className="space-x-2">
              <Building2 className="h-4 w-4" />
              <span>Virement Bancaire</span>
            </TabsTrigger>
            <TabsTrigger value="mobile" className="space-x-2">
              <Wallet className="h-4 w-4" />
              <span>Paiement Mobile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="card">
            <CardPaymentForm amount={5000} loading={false} onSubmit={() => {}} />
          </TabsContent>

          <TabsContent value="bank">
            <BankTransferInfo referenceId="TF-12345" />
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