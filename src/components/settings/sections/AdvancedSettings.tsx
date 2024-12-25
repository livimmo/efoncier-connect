import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
          <Button variant="destructive" onClick={handleDeleteAccount}>
            Supprimer mon compte
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};