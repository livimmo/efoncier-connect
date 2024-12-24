import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const MobilePayment = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Paiement Mobile</CardTitle>
        <CardDescription>
          Payez facilement avec votre portefeuille mobile
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center p-8">
          <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
            QR Code
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Scannez ce code QR avec votre application de paiement mobile
        </p>
      </CardContent>
    </Card>
  );
};