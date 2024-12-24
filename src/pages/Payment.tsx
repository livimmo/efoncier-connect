import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Home, CreditCard, Wallet, Building2, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/format";
import { CardPaymentForm } from "@/components/payment/CardPaymentForm";
import { BankTransferInfo } from "@/components/payment/BankTransferInfo";
import { MobilePayment } from "@/components/payment/MobilePayment";
import type { PaymentDetails, PaymentProps } from "@/components/payment/types";

const Payment = ({ parcelId, hideHeader }: PaymentProps & { hideHeader?: boolean }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Mock payment data - à remplacer par les vraies données
  const paymentData: PaymentDetails = {
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
      {!hideHeader && (
        <>
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
          </main>
        </>
      )}

      <div className={hideHeader ? "" : "container mx-auto p-6 max-w-5xl space-y-8"}>
        {/* Récapitulatif du bien */}
        <Card className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">Détails du Bien</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">N° Titre Foncier</span>
                    <span className="font-medium">{paymentData.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Localisation</span>
                    <span className="font-medium">{paymentData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Superficie</span>
                    <span className="font-medium">{paymentData.area} m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium">{paymentData.type}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">Paiement</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Montant à payer</span>
                    <span className="text-xl font-bold">
                      {formatCurrency(paymentData.amount)} MAD
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Date limite</span>
                    <span className="font-medium">{new Date(paymentData.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Statut</span>
                    <Badge variant={paymentData.status === "paid" ? "success" : "destructive"}>
                      {paymentData.status === "paid" ? "Payé" : "Impayé"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Options de paiement */}
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

        {/* Actions rapides */}
        <div className="flex justify-end space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
          >
            Annuler
          </Button>
          {!hideHeader && (
            <Button 
              onClick={() => navigate("/dashboard")}
              className="gap-2"
            >
              Retour au tableau de bord
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;