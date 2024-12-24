import { Building2, Receipt, AlertCircle, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PaymentDetails } from "./types";

interface PaymentSummaryProps {
  payment: PaymentDetails;
}

export const PaymentSummary = ({ payment }: PaymentSummaryProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Résumé du Paiement</CardTitle>
        <CardDescription>Détails de la propriété et montant dû</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">ID Terrain: {payment.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <Receipt className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Localisation: {payment.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Superficie: {payment.area} m²</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Type: {payment.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Échéance: {new Date(payment.dueDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-primary">
            <Receipt className="h-4 w-4" />
            <span>Montant: {payment.amount.toLocaleString()} MAD</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};