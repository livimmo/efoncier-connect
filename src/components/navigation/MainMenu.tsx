import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Map, CreditCard, MessageSquare, HelpCircle, History } from "lucide-react";

export function MainMenu() {
  const location = useLocation();

  const menuItems = [
    {
      href: "/map",
      label: "Carte Interactive",
      icon: Map,
      description: "Explorez les parcelles sur la carte interactive"
    },
    {
      href: "/payment",
      label: "Paiements",
      icon: CreditCard,
      description: "Gérez vos paiements et transactions"
    },
    {
      href: "/history",
      label: "Historique",
      icon: History,
      description: "Consultez l'historique de vos transactions"
    },
    {
      href: "/messages",
      label: "Messages",
      icon: MessageSquare,
      description: "Consultez vos messages et conversations"
    },
    {
      href: "/support",
      label: "Support",
      icon: HelpCircle,
      description: "Obtenez de l'aide et consultez la FAQ"
    }
  ];

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary relative group",
            location.pathname === item.href 
              ? "text-primary after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-0.5 after:bg-primary" 
              : "text-muted-foreground"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}