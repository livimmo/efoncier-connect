import { PaymentHeader } from "@/components/payment/PaymentHeader";
import { PropertySelection } from "@/components/payment/PropertySelection";
import { CardPaymentForm } from "@/components/payment/CardPaymentForm";
import { BankTransferInfo } from "@/components/payment/BankTransferInfo";
import { MobilePayment } from "@/components/payment/MobilePayment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Building2, Wallet } from "lucide-react";
import { useState } from "react";
import { Property } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-media-query";

const mockProperties: Property[] = [
  {
    id: "1",
    title: "Villa Moderne - Californie",
    location: {
      address: "15 Boulevard de l'Océan, Californie",
      lat: 33.5731,
      lng: -7.5898
    },
    price: 15000,
    type: "RESIDENTIAL",
    status: "AVAILABLE",
    zone: "URBAN",
    surface: 450,
    owner: "Ahmed El Fassi",
    titleDeedNumber: "TF123456/C",
    ownerName: "Ahmed El Fassi",
    fiscalStatus: "NON_COMPLIANT",
    taxStatus: "OVERDUE"
  },
  {
    id: "2",
    title: "Appartement - Gauthier",
    location: {
      address: "45 Rue Jean Jaurès, Gauthier",
      lat: 33.5850,
      lng: -7.6328
    },
    price: 8000,
    type: "RESIDENTIAL",
    status: "AVAILABLE",
    zone: "URBAN",
    surface: 180,
    owner: "Karim Benjelloun",
    titleDeedNumber: "TF345678/C",
    ownerName: "Karim Benjelloun",
    fiscalStatus: "NON_COMPLIANT",
    taxStatus: "OVERDUE"
  },
  {
    id: "3",
    title: "Local Commercial - Maarif",
    location: {
      address: "156 Rue Zerktouni, Maarif",
      lat: 33.5876,
      lng: -7.6331
    },
    price: 12000,
    type: "COMMERCIAL",
    status: "AVAILABLE",
    zone: "URBAN",
    surface: 120,
    owner: "Société Retail Plus",
    titleDeedNumber: "TF567890/C",
    ownerName: "Société Retail Plus",
    fiscalStatus: "NON_COMPLIANT",
    taxStatus: "OVERDUE"
  }
];

const Payment = () => {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

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
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className={`container mx-auto p-4 ${isMobile ? 'pb-20' : 'p-6'} space-y-6`}>
        <PaymentHeader />
        
        <div className="grid gap-6">
          <PropertySelection 
            onPropertySelect={handlePropertySelection}
            selectedProperties={selectedProperties}
          />
          
          {selectedProperties.length > 0 && (
            <Tabs defaultValue="card" className="w-full">
              <TabsList className={`grid w-full ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-3'}`}>
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

              <div className="mt-4">
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
              </div>
            </Tabs>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default Payment;