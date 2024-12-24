import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { PaymentSummary } from "@/components/payment/PaymentSummary";
import { CardPaymentForm } from "@/components/payment/CardPaymentForm";
import { BankTransferInfo } from "@/components/payment/BankTransferInfo";
import { MobilePayment } from "@/components/payment/MobilePayment";
import { Header } from "@/components/Header";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Mock payment data - à remplacer par les vraies données
  const paymentData = {
    id: "TF#123456",
    location: "Casablanca, Maarif",
    area: 500,
    type: "E4",
    amount: 15000,
    dueDate: "2024-06-30",
    status: "unpaid"
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simuler le traitement du paiement
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
      <Header />
      
      <main className="container mx-auto p-6 max-w-5xl space-y-8">
        {/* Fil d'Ariane */}
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

        {/* En-tête */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Effectuer un Paiement</h1>
          <p className="text-muted-foreground">
            Régularisez vos paiements en toute simplicité et sécurité
          </p>
        </div>

        {/* Résumé du paiement */}
        <PaymentSummary payment={paymentData} />
        
        {/* Options de paiement */}
        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="card">Carte Bancaire</TabsTrigger>
            <TabsTrigger value="bank">Virement Bancaire</TabsTrigger>
            <TabsTrigger value="mobile">Paiement Mobile</TabsTrigger>
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
      </main>
    </div>
  );
};

export default Payment;