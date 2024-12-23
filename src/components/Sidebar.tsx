import { Home, MapPin, FileText, Users, Bell, Settings, HelpCircle, LayoutDashboard, CreditCard, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "Tableau de Bord", href: "/dashboard" },
  { icon: MapPin, label: "Carte Interactive", href: "/" },
  { icon: CreditCard, label: "Paiements", href: "/dashboard?tab=payments" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard?tab=messages" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Settings, label: "Paramètres", href: "/settings" },
  { icon: HelpCircle, label: "Support & FAQ", href: "/support" },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300",
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
              onClick={() => navigate(item.href)}
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