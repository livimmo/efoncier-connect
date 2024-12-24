import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { SidebarContent } from "./sidebar/SidebarContent";
import { MobileSidebar } from "./sidebar/MobileSidebar";
import { getMenuItems } from "./sidebar/menuItems";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);
  const { profile, signOut } = useAuth();

  const menuItems = getMenuItems(profile?.role || 'owner');

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  if (isMobile) {
    return (
      <MobileSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        menuItems={menuItems}
        currentPath={location.pathname}
        onSignOut={handleSignOut}
      />
    );
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-secondary border-r border-secondary/20 transition-all duration-300 dark:bg-secondary/95",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarContent
        menuItems={menuItems}
        collapsed={collapsed}
        currentPath={location.pathname}
        onSignOut={handleSignOut}
      />
      
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