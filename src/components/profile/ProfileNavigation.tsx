import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  BarChart, 
  Bell, 
  Settings 
} from "lucide-react";

export function ProfileNavigation() {
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: "Tableau de Bord",
      icon: LayoutDashboard,
      href: "?tab=overview"
    },
    {
      label: "Mes Biens",
      icon: FileText,
      href: "?tab=properties"
    },
    {
      label: "Ajouter un Bien",
      icon: PlusCircle,
      href: "/property/add"
    },
    {
      label: "Statistiques",
      icon: BarChart,
      href: "?tab=stats"
    },
    {
      label: "Notifications",
      icon: Bell,
      href: "/notifications"
    },
    {
      label: "Paramètres",
      icon: Settings,
      href: "?tab=settings"
    }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {navigationItems.map((item) => (
        <Button
          key={item.href}
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => navigate(item.href)}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Button>
      ))}
    </div>
  );
}