import { 
  Home, 
  User, 
  CreditCard, 
  Building2, 
  FileText, 
  Bell, 
  Settings, 
  LogOut, 
  Star, 
  History, 
  MessageSquare,
  MapPin 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";

const getMenuItems = (role: string) => {
  const items = {
    owner: [
      { icon: Building2, label: "Mes Biens", href: "/owner/properties" },
      { icon: CreditCard, label: "Paiements", href: "/owner/payments" },
      { icon: MessageSquare, label: "Messages", href: "/messages" },
    ],
    developer: [
      { icon: Building2, label: "Mes Projets", href: "/developer/properties" },
      { icon: MapPin, label: "Carte Interactive", href: "/map" },
      { icon: MessageSquare, label: "Messages", href: "/messages" },
      { icon: Star, label: "Mes Favoris", href: "/developer/favorites" },
    ],
    commune: [
      { icon: Building2, label: "Gestion des Biens", href: "/commune/properties" },
      { icon: CreditCard, label: "Paiements", href: "/commune/payments" },
      { icon: MessageSquare, label: "Messages", href: "/messages" },
    ],
    admin: [
      { icon: Building2, label: "Gestion des Biens", href: "/admin/properties" },
      { icon: FileText, label: "Rapports", href: "/admin/reports" },
      { icon: MessageSquare, label: "Messages", href: "/messages" },
    ],
  };
  return items[role as keyof typeof items] || items.owner;
};

export const UserMenuContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile, signOut } = useAuth();

  const handleSignOut = async () => {
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
        description: "Une erreur est survenue lors de la déconnexion.",
        variant: "destructive",
      });
    }
  };

  const menuItems = getMenuItems(profile?.role || "owner");

  return (
    <div className="w-56 space-y-1">
      <div className="p-2">
        <div className="flex items-center gap-2 p-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {profile?.name || "Utilisateur"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {profile?.email || "email@example.com"}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t" />
      <div className="p-2">
        {menuItems.map((item) => (
          <button
            key={item.href}
            className="w-full flex items-center gap-2 p-2 text-sm rounded-md hover:bg-accent"
            onClick={() => navigate(item.href)}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </div>
      <div className="border-t" />
      <div className="p-2">
        <button
          className="w-full flex items-center gap-2 p-2 text-sm rounded-md hover:bg-accent"
          onClick={() => navigate("/notifications")}
        >
          <Bell className="w-4 h-4" />
          Notifications
        </button>
        <button
          className="w-full flex items-center gap-2 p-2 text-sm rounded-md hover:bg-accent"
          onClick={() => navigate("/settings")}
        >
          <Settings className="w-4 h-4" />
          Paramètres
        </button>
      </div>
      <div className="border-t" />
      <div className="p-2">
        <button
          className="w-full flex items-center gap-2 p-2 text-sm rounded-md hover:bg-accent text-red-500 hover:text-red-500"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </div>
  );
};