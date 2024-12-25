import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const SecuritySettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Authentification à Deux Facteurs</CardTitle>
          <CardDescription>
            Ajoutez une couche de sécurité supplémentaire à votre compte.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Switch id="2fa" />
            <Label htmlFor="2fa">Activer l'authentification à deux facteurs</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Changer le Mot de Passe</CardTitle>
          <CardDescription>
            Mettez à jour votre mot de passe régulièrement pour plus de sécurité.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Changer le mot de passe</Button>
        </CardContent>
      </Card>
    </div>
  );
};