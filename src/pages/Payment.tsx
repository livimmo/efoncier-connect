import { Header } from "@/components/Header";
import { PaymentSummary } from "@/components/payment/PaymentSummary";
import { PaymentForm } from "@/components/payment/PaymentForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const mockPayment = {
  id: "TF#123456",
  location: "Casablanca, Maarif",
  area: 3500,
  type: "Résidentiel",
  amount: 25000,
  dueDate: "2024-12-30",
  status: "pending"
};

const Payment = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Paiement des Taxes Foncières</h1>
        
        <PaymentSummary payment={mockPayment} />

        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="card">Carte Bancaire</TabsTrigger>
            <TabsTrigger value="bank">Virement Bancaire</TabsTrigger>
            <TabsTrigger value="mobile">Paiement Mobile</TabsTrigger>
          </TabsList>

          <TabsContent value="card">
            <PaymentForm amount={mockPayment.amount} />
          </TabsContent>

          <TabsContent value="bank">
            <Card>
              <CardHeader>
                <CardTitle>Virement Bancaire</CardTitle>
                <CardDescription>
                  Effectuez un virement vers notre compte bancaire
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono mb-2">IBAN: MA00 0000 0000 0000 0000 0000</p>
                  <p className="text-sm text-muted-foreground">
                    Veuillez inclure votre ID Terrain ({mockPayment.id}) comme référence
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mobile">
            <Card>
              <CardHeader>
                <CardTitle>Paiement Mobile</CardTitle>
                <CardDescription>
                  Payez facilement avec votre portefeuille mobile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center p-8">
                  <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                    QR Code
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Scannez ce code QR avec votre application de paiement mobile
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Payment;