import { Check, Download, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format";

interface PaymentConfirmationProps {
  data: any;
  onNewPayment: () => void;
}

export const PaymentConfirmation = ({ data, onNewPayment }: PaymentConfirmationProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
          <Check className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold mb-2">
          Paiement effectué avec succès !
        </h2>
        <p className="text-muted-foreground">
          Un email de confirmation a été envoyé à votre adresse.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Récapitulatif du Paiement</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Référence</dt>
              <dd className="text-lg">{data.reference}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Montant Payé</dt>
              <dd className="text-lg font-bold text-primary">
                {formatCurrency(data.amount)} MAD
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Date du Paiement</dt>
              <dd className="text-lg">{new Date().toLocaleDateString()}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onNewPayment} variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" />
          Nouveau Paiement
        </Button>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Télécharger le Reçu
        </Button>
      </div>
    </div>
  );
};