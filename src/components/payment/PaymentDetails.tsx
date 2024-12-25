import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format";

interface PaymentDetailsProps {
  data: {
    reference: string;
    location: string;
    surface: number;
    zoning: string;
    amount: number;
    fiscalYear: number;
  };
}

export const PaymentDetails = ({ data }: PaymentDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Détails du Paiement</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Référence</dt>
            <dd className="text-lg">{data.reference}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Localisation</dt>
            <dd className="text-lg">{data.location}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Superficie</dt>
            <dd className="text-lg">{data.surface} m²</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Zoning</dt>
            <dd className="text-lg">{data.zoning}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Année Fiscale</dt>
            <dd className="text-lg">{data.fiscalYear}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Montant à Payer</dt>
            <dd className="text-lg font-bold text-primary">
              {formatCurrency(data.amount)} MAD
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
};