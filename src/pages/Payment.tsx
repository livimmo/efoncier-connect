import { PaymentHeader } from "@/components/payment/PaymentHeader";
import { PropertySelection } from "@/components/payment/PropertySelection";
import { CardPaymentForm } from "@/components/payment/CardPaymentForm";
import { BankTransferInfo } from "@/components/payment/BankTransferInfo";
import { MobilePayment } from "@/components/payment/MobilePayment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Building2, Wallet } from "lucide-react";
import { useState } from "react";
import { Property } from "@/types";

const Payment = () => {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const handlePropertySelection = (property: Property, isSelected: boolean) => {
    if (isSelected) {
      setSelectedProperties(prev => [...prev, property]);
      setTotalAmount(prev => prev + property.price);
    } else {
      setSelectedProperties(prev => prev.filter(p => p.id !== property.id));
      setTotalAmount(prev => prev - property.price);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <PaymentHeader />
      
      <div className="grid gap-6">
        <PropertySelection 
          onPropertySelect={handlePropertySelection}
          selectedProperties={selectedProperties}
        />
        
        {selectedProperties.length > 0 && (
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
              <CardPaymentForm 
                amount={totalAmount} 
                loading={false} 
                onSubmit={() => {}} 
              />
            </TabsContent>

            <TabsContent value="bank">
              <BankTransferInfo 
                referenceId={selectedProperties.map(p => p.id).join(",")} 
              />
            </TabsContent>

            <TabsContent value="mobile">
              <MobilePayment />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Payment;