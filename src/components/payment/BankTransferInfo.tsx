import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface BankTransferInfoProps {
  referenceId: string;
}

export const BankTransferInfo = ({ referenceId }: BankTransferInfoProps) => {
  return (
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
            Veuillez inclure votre ID Terrain ({referenceId}) comme référence
          </p>
        </div>
      </CardContent>
    </Card>
  );
};