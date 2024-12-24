import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Building2, Calendar, Lock, Receipt, AlertCircle } from "lucide-react";

interface PaymentProps {
  parcelId?: string;
}

interface PaymentDetails {
  id: string;
  location: string;
  area: number;
  type: string;
  amount: number;
  dueDate: string;
  status: "paid" | "unpaid" | "pending";
}

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
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | "mobile">("card");
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
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Paiement des Taxes Foncières</h1>
        
        {/* Payment Summary Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Résumé du Paiement</CardTitle>
            <CardDescription>Détails de la propriété et montant dû</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">ID Terrain: {mockPayment.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <Receipt className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Localisation: {mockPayment.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Superficie: {mockPayment.area} m²</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Type: {mockPayment.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Échéance: {new Date(mockPayment.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-primary">
                <Receipt className="h-4 w-4" />
                <span>Montant: {mockPayment.amount.toLocaleString()} MAD</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="card">Carte Bancaire</TabsTrigger>
            <TabsTrigger value="bank">Virement Bancaire</TabsTrigger>
            <TabsTrigger value="mobile">Paiement Mobile</TabsTrigger>
          </TabsList>

          <TabsContent value="card">
            <Card>
              <form onSubmit={handlePayment}>
                <CardHeader>
                  <CardTitle>Paiement par Carte</CardTitle>
                  <CardDescription>
                    Entrez les informations de votre carte bancaire
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Nom sur la carte</Label>
                    <Input id="cardName" placeholder="PRÉNOM NOM" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Numéro de carte</Label>
                    <div className="relative">
                      <Input 
                        id="cardNumber" 
                        placeholder="1234 5678 9012 3456"
                        required 
                      />
                      <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Date d'expiration</Label>
                      <Input id="expiry" placeholder="MM/AA" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <div className="relative">
                        <Input 
                          id="cvv" 
                          placeholder="123"
                          required 
                          maxLength={4}
                        />
                        <Lock className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Traitement..." : `Payer ${mockPayment.amount.toLocaleString()} MAD`}
                  </Button>
                </CardFooter>
              </form>
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
                  {/* Placeholder for QR code */}
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