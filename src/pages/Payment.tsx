import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Home, CreditCard, Wallet, Building2, ArrowRight } from "lucide-react";
import { PaymentSummary } from "@/components/payment/PaymentSummary";
import { CardPaymentForm } from "@/components/payment/CardPaymentForm";
import { BankTransferInfo } from "@/components/payment/BankTransferInfo";
import { MobilePayment } from "@/components/payment/MobilePayment";
import type { PaymentProps } from "@/components/payment/types";

const Payment = ({ parcelId, hideHeader }: PaymentProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Mock payment data - to be replaced with real data
  const paymentData = {
    id: parcelId || "TF#123456",
    location: "Casablanca, Maarif",
    area: 500,
    type: "E4",
    amount: 15000,
    dueDate: "2024-06-30",
    status: "unpaid" as const
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Paiement réussi",
        description: "Votre paiement a été traité avec succès.",
        duration: 5000,
      });
      
      navigate("/receipt");
    } catch (error) {
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors du traitement du paiement.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {!hideHeader && (
        <>
          <Header />
          <main className="container mx-auto p-6 max-w-5xl space-y-8">
            {/* Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink>Paiement</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>

            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold">Effectuer un Paiement</h1>
              <p className="text-muted-foreground">
                Réglez vos taxes en toute simplicité et sécurité
              </p>
            </div>
          </main>
        </>
      )}

      <div className={hideHeader ? "" : "container mx-auto p-6 max-w-5xl space-y-8"}>
        {/* Payment Summary */}
        <PaymentSummary payment={paymentData} />
        
        {/* Payment Options */}
        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
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
              amount={paymentData.amount}
              loading={loading}
              onSubmit={handlePayment}
            />
          </TabsContent>

          <TabsContent value="bank">
            <BankTransferInfo referenceId={paymentData.id} />
          </TabsContent>

          <TabsContent value="mobile">
            <MobilePayment />
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="flex justify-end space-x-4">
          <button 
            className="text-sm text-muted-foreground hover:text-foreground"
            onClick={() => navigate(-1)}
          >
            Annuler
          </button>
          {!hideHeader && (
            <button 
              className="inline-flex items-center space-x-2 text-sm text-primary hover:text-primary/80"
              onClick={() => navigate("/dashboard")}
            >
              <span>Retour au tableau de bord</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;