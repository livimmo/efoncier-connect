import { Home, Settings, CreditCard, Database, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const UserMenuContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut, profile } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenuContent className="w-56" align="end" sideOffset={5}>
      <div className="flex items-center justify-start gap-2 p-2">
        <div className="flex flex-col space-y-1 leading-none">
          <p className="font-medium">
            {profile?.first_name} {profile?.last_name}
          </p>
          <p className="text-sm text-muted-foreground">
            {profile?.role === "owner" ? "Propriétaire" : 
             profile?.role === "developer" ? "Promoteur" : "Administrateur"}
          </p>
        </div>
      </div>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => navigate("/dashboard")}>
        <Home className="mr-2 h-4 w-4" />
        <span>Tableau de Bord</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => navigate("/profile?tab=settings")}>
        <Settings className="mr-2 h-4 w-4" />
        <span>Paramètres</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => navigate("/history")}>
        <CreditCard className="mr-2 h-4 w-4" />
        <span>Historique des Paiements</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => navigate("/profile?tab=properties")}>
        <Database className="mr-2 h-4 w-4" />
        <span>Mes Biens</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Se Déconnecter</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};