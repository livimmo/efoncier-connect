import { Home, User, CreditCard, Database, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const UserMenuContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut, profile } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Erreur lors de la déconnexion",
        description: "Veuillez réessayer",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">
            {profile?.first_name} {profile?.last_name}
          </p>
          <p className="text-xs leading-none text-muted-foreground">
            {profile?.email}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => navigate("/dashboard")}>
        <Home className="mr-2 h-4 w-4" />
        <span>Tableau de Bord</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => navigate("/profile")}>
        <User className="mr-2 h-4 w-4" />
        <span>Profil</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => navigate("/history")}>
        <CreditCard className="mr-2 h-4 w-4" />
        <span>Historique</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => navigate("/support")}>
        <Database className="mr-2 h-4 w-4" />
        <span>Support</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Se déconnecter</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};