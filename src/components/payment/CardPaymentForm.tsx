import { CreditCard, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface CardPaymentFormProps {
  amount: number;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const CardPaymentForm = ({ amount, loading, onSubmit }: CardPaymentFormProps) => {
  return (
    <Card>
      <form onSubmit={onSubmit}>
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
            {loading ? "Traitement..." : `Payer ${amount.toLocaleString()} MAD`}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};