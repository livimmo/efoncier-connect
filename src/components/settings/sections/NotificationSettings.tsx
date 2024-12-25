import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/auth/AuthProvider";

export const NotificationSettings = () => {
  const { profile } = useAuth();

  const renderOwnerNotifications = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Switch id="payment-reminders" />
        <Label htmlFor="payment-reminders">Rappels de Paiement TNB</Label>
      </div>
      <div className="flex items-center space-x-4">
        <Switch id="developer-messages" />
        <Label htmlFor="developer-messages">Nouveaux Messages du Promoteur</Label>
      </div>
      <div className="flex items-center space-x-4">
        <Switch id="fiscal-updates" />
        <Label htmlFor="fiscal-updates">Mises à Jour de Statut Fiscal</Label>
      </div>
    </div>
  );

  const renderDeveloperNotifications = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Switch id="new-properties" />
        <Label htmlFor="new-properties">Nouveaux Biens Disponibles</Label>
      </div>
      <div className="flex items-center space-x-4">
        <Switch id="favorite-updates" />
        <Label htmlFor="favorite-updates">Mises à Jour des Biens Favoris</Label>
      </div>
      <div className="flex items-center space-x-4">
        <Switch id="owner-responses" />
        <Label htmlFor="owner-responses">Réponses des Propriétaires</Label>
      </div>
    </div>
  );

  const renderCommuneNotifications = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Switch id="fiscal-alerts" />
        <Label htmlFor="fiscal-alerts">Alertes Statut Fiscal des Biens</Label>
      </div>
      <div className="flex items-center space-x-4">
        <Switch id="admin-reports" />
        <Label htmlFor="admin-reports">Mises à Jour des Rapports Administratifs</Label>
      </div>
      <div className="flex items-center space-x-4">
        <Switch id="owner-requests" />
        <Label htmlFor="owner-requests">Demandes des Propriétaires</Label>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Préférences de Notification</CardTitle>
          <CardDescription>
            Gérez vos préférences de notification pour rester informé.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {profile?.role === "owner" && renderOwnerNotifications()}
          {profile?.role === "developer" && renderDeveloperNotifications()}
          {profile?.role === "commune" && renderCommuneNotifications()}
        </CardContent>
      </Card>
    </div>
  );
};