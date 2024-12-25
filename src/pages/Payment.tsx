import { useState } from "react";
import { Shield, CreditCard, Building2, Smartphone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentIdentification } from "@/components/payment/PaymentIdentification";
import { PaymentDetails } from "@/components/payment/PaymentDetails";
import { PaymentConfirmation } from "@/components/payment/PaymentConfirmation";
import { Steps } from "@/components/payment/Steps";

const Payment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentData, setPaymentData] = useState<any>(null);

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* En-tête */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Effectuez Votre Paiement en Toute Sécurité
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Payez vos taxes et frais liés à vos terrains de manière rapide et sécurisée.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span>Transaction sécurisée via SSL/TLS</span>
        </div>
      </div>

      {/* Étapes */}
      <Steps currentStep={currentStep} />

      {/* Contenu principal */}
      <div className="grid gap-6">
        {currentStep === 1 && (
          <PaymentIdentification 
            onNext={(data) => {
              setPaymentData(data);
              setCurrentStep(2);
            }}
          />
        )}

        {currentStep === 2 && (
          <div className="grid gap-6">
            <PaymentDetails data={paymentData} />
            
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
                  <Smartphone className="h-4 w-4" />
                  <span>Paiement Mobile</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="card">
                <Card>
                  <CardHeader>
                    <CardTitle>Paiement par Carte Bancaire</CardTitle>
                    <CardDescription>
                      Paiement sécurisé via notre plateforme certifiée
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Formulaire de paiement par carte existant */}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bank">
                <Card>
                  <CardHeader>
                    <CardTitle>Virement Bancaire</CardTitle>
                    <CardDescription>
                      Effectuez un virement vers notre compte bancaire
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Informations de virement bancaire */}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mobile">
                <Card>
                  <CardHeader>
                    <CardTitle>Paiement Mobile</CardTitle>
                    <CardDescription>
                      Payez avec votre application mobile préférée
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* QR Code et options de paiement mobile */}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {currentStep === 3 && (
          <PaymentConfirmation 
            data={paymentData}
            onNewPayment={() => {
              setPaymentData(null);
              setCurrentStep(1);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Payment;