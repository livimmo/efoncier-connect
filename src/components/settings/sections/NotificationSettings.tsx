import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const NotificationSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Préférences de Notification</CardTitle>
          <CardDescription>
            Gérez vos préférences de notification pour rester informé.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Switch id="email-notifs" />
            <Label htmlFor="email-notifs">Notifications par email</Label>
          </div>
          <div className="flex items-center space-x-4">
            <Switch id="payment-notifs" />
            <Label htmlFor="payment-notifs">Alertes de paiement</Label>
          </div>
          <div className="flex items-center space-x-4">
            <Switch id="update-notifs" />
            <Label htmlFor="update-notifs">Mises à jour importantes</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};