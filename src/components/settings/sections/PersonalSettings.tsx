import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

export const PersonalSettings = () => {
  const { profile } = useAuth();
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Photo de Profil</CardTitle>
          <CardDescription>
            Cette photo sera visible par les autres utilisateurs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>
                {profile?.first_name?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <Button>Changer la photo</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informations Personnelles</CardTitle>
          <CardDescription>
            Mettez à jour vos informations de profil.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input 
                id="firstName" 
                defaultValue={profile?.first_name} 
                placeholder="Votre prénom"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input 
                id="lastName" 
                defaultValue={profile?.last_name} 
                placeholder="Votre nom"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              defaultValue={profile?.email} 
              placeholder="votre@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input 
              id="phone" 
              defaultValue={profile?.phone} 
              placeholder="+212 6XX XXX XXX"
            />
          </div>

          <Button onClick={handleSave} className="mt-4">
            Enregistrer les modifications
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};