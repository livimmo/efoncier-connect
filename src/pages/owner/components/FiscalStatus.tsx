import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Receipt, ArrowRight } from "lucide-react";

export const FiscalStatus = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Statut Fiscal</h3>
        <Button variant="ghost" size="sm" className="gap-2">
          Voir Détails
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progression des Paiements</span>
            <span className="font-medium">75%</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>

        <div className="grid gap-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Montant Total</span>
            <span className="font-medium">120,000 DH</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Montant Payé</span>
            <span className="font-medium text-green-600">90,000 DH</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Reste à Payer</span>
            <span className="font-medium text-yellow-600">30,000 DH</span>
          </div>
        </div>

        <Button className="w-full gap-2">
          <Receipt className="h-4 w-4" />
          Payer Maintenant
        </Button>
      </div>
    </div>
  );
};