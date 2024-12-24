import { Home, MapPin, FileText, Users, Bell, Settings, HelpCircle, LayoutDashboard, CreditCard, MessageSquare, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useAuth } from "@/components/auth/AuthProvider";

const getMenuItems = (role: string) => {
  const commonItems = [
    { icon: MapPin, label: "Carte Interactive", href: "/" },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
    { icon: Bell, label: "Notifications", href: "/notifications" },
    { icon: Settings, label: "Paramètres", href: "/settings" },
    { icon: HelpCircle, label: "Support & FAQ", href: "/support" },
  ];

  const roleSpecificItems = {
    admin: [
      { icon: LayoutDashboard, label: "Tableau de Bord", href: "/admin" },
      { icon: Users, label: "Utilisateurs", href: "/admin?tab=users" },
      { icon: FileText, label: "Rapports", href: "/admin?tab=reports" },
    ],
    developer: [
      { icon: LayoutDashboard, label: "Tableau de Bord", href: "/developer" },
      { icon: FileText, label: "Projets", href: "/developer?tab=projects" },
      { icon: Users, label: "Partenaires", href: "/developer?tab=partners" },
    ],
    taxpayer: [
      { icon: LayoutDashboard, label: "Tableau de Bord", href: "/taxpayer" },
      { icon: CreditCard, label: "Paiements", href: "/taxpayer?tab=payments" },
      { icon: FileText, label: "Mes Biens", href: "/taxpayer?tab=parcels" },
    ],
  };

  return [...(roleSpecificItems[role as keyof typeof roleSpecificItems] || []), ...commonItems];
};

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useAuth();

  const menuItems = getMenuItems(profile?.role || 'taxpayer');

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  const SidebarContent = () => (
    <div className="p-4 space-y-2">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className={cn(
              "w-full justify-start text-secondary-foreground hover:bg-secondary-foreground/10",
              collapsed ? "px-2" : "px-4",
              location.pathname === item.href && "bg-secondary-foreground/10"
            )}
            onClick={() => {
              navigate(item.href);
              if (isMobile) setIsOpen(false);
            }}
          >
            <item.icon className="h-5 w-5 mr-2" />
            {!collapsed && <span>{item.label}</span>}
          </Button>
        ))}
      </nav>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-40 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-secondary border-r border-secondary/20 transition-all duration-300 dark:bg-secondary/95",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarContent />
      
      <Button
        variant="ghost"
        size="sm"
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-secondary text-secondary-foreground hover:bg-secondary-foreground/10"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "→" : "←"}
      </Button>
    </aside>
  );
};