import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PaymentIdentificationProps {
  onNext: (data: any) => void;
}

export const PaymentIdentification = ({ onNext }: PaymentIdentificationProps) => {
  const [reference, setReference] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reference) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un numéro de référence",
        variant: "destructive",
      });
      return;
    }

    // Simuler la récupération des données
    const mockData = {
      reference,
      location: "Ain Sebaa, Casablanca",
      surface: 500,
      zoning: "E4",
      amount: 15000,
      fiscalYear: 2024,
    };

    onNext(mockData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identification du Paiement</CardTitle>
        <CardDescription>
          Entrez votre numéro de référence pour commencer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="reference">Numéro de Référence TNB</Label>
            <Input
              id="reference"
              placeholder="Ex: TNB-123456"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              Suivant
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};