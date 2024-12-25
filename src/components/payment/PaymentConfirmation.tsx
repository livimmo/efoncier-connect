import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Download, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PaymentConfirmation = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="text-center pb-2">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Check className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-xl text-center text-primary">
          Paiement effectué avec succès !
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="text-center text-muted-foreground text-sm">
          <p>Un email de confirmation a été envoyé à votre adresse.</p>
          <p>Référence de transaction : TXN-123456</p>
        </div>

        <div className="flex flex-col gap-3">
          <Button onClick={() => navigate("/receipt/123")}>
            <Download className="w-4 h-4 mr-2" />
            Télécharger le reçu
          </Button>
          <Button variant="outline" onClick={() => navigate("/payment")}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Effectuer un nouveau paiement
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};