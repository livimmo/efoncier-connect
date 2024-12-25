import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const AdvancedSettings = () => {
  const { toast } = useToast();

  const handleDeleteAccount = () => {
    toast({
      title: "Action non disponible",
      description: "Cette fonctionnalité n'est pas encore disponible.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Paramètres Avancés</CardTitle>
          <CardDescription>
            Options avancées pour votre compte.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Langue de l'Interface</Label>
            <Select defaultValue="fr">
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une langue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Fuseau Horaire</Label>
            <Select defaultValue="africa-casablanca">
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un fuseau horaire" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="africa-casablanca">Casablanca (GMT+1)</SelectItem>
                <SelectItem value="europe-paris">Paris (GMT+2)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="destructive" onClick={handleDeleteAccount}>
            Supprimer mon compte
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};