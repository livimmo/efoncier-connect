import { Home, User, CreditCard, Building2, FileText, Bell, Settings, LogOut, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const roleLabels = {
  owner: "Propriétaire",
  developer: "Promoteur",
  commune: "Commune",
  admin: "Administrateur"
};

const getRoleSpecificMenuItems = (role: string) => {
  const items = {
    owner: [
      { icon: Building2, label: "Mes Biens", href: "/owner/properties" },
      { icon: CreditCard, label: "Paiements", href: "/owner/payments" },
    ],
    developer: [
      { icon: Building2, label: "Mes Projets", href: "/developer/properties" },
      { icon: Star, label: "Mes Favoris", href: "/developer/favorites" },
    ],
    commune: [
      { icon: Building2, label: "Gestion des Biens", href: "/commune/properties" },
      { icon: CreditCard, label: "Paiements", href: "/commune/payments" },
    ],
    admin: [
      { icon: Building2, label: "Gestion des Biens", href: "/admin/properties" },
      { icon: FileText, label: "Rapports", href: "/admin/reports" },
    ],
  };
  return items[role as keyof typeof items] || items.owner;
};

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

  const roleSpecificItems = getRoleSpecificMenuItems(profile?.role || 'owner');

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
          <p className="text-xs font-medium text-primary">
            {profile?.role ? roleLabels[profile.role as keyof typeof roleLabels] : ''}
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
      {roleSpecificItems.map((item) => (
        <DropdownMenuItem key={item.href} onClick={() => navigate(item.href)}>
          <item.icon className="mr-2 h-4 w-4" />
          <span>{item.label}</span>
        </DropdownMenuItem>
      ))}
      <DropdownMenuItem onClick={() => navigate("/notifications")}>
        <Bell className="mr-2 h-4 w-4" />
        <span>Notifications</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => navigate("/settings")}>
        <Settings className="mr-2 h-4 w-4" />
        <span>Paramètres</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Se déconnecter</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};