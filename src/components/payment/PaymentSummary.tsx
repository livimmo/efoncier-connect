import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/format";
import type { PaymentDetails } from "./types";

interface PaymentSummaryProps {
  payment: PaymentDetails;
}

export const PaymentSummary = ({ payment }: PaymentSummaryProps) => {
  return (
    <Card className="p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">Détails du Bien</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">N° Titre Foncier</span>
                <span className="font-medium">{payment.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Localisation</span>
                <span className="font-medium">{payment.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Superficie</span>
                <span className="font-medium">{payment.area} m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium">{payment.type}</span>
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
                  {formatCurrency(payment.amount)} MAD
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Date limite</span>
                <span className="font-medium">{new Date(payment.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Statut</span>
                <Badge variant={payment.status === "paid" ? "success" : "destructive"}>
                  {payment.status === "paid" ? "Payé" : "Impayé"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};