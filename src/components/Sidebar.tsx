import { Home, MapPin, FileText, Users, Bell, Settings, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
  { icon: Home, label: "Tableau de Bord", href: "/" },
  { icon: MapPin, label: "Carte Interactive", href: "/map" },
  { icon: FileText, label: "Historique des Paiements", href: "/payments" },
  { icon: Users, label: "Mise en Relation", href: "/networking" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Settings, label: "Paramètres", href: "/settings" },
  { icon: HelpCircle, label: "Support & FAQ", href: "/support" },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toast } = useToast();

  const handleMenuClick = (label: string) => {
    toast({
      title: "Navigation",
      description: `Navigation vers ${label}`,
    });
  };

  return (
    <aside
      className={cn(
        "h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 mt-16",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                collapsed ? "px-2" : "px-4"
              )}
              onClick={() => handleMenuClick(item.label)}
            >
              <item.icon className="h-5 w-5 mr-2" />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </nav>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        className="absolute -right-3 top-1/2 transform -translate-y-1/2"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "→" : "←"}
      </Button>
    </aside>
  );
};