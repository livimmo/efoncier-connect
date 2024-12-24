import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SidebarMenuButton } from "./SidebarMenuButton";
import { MenuItem } from "./types";

interface SidebarContentProps {
  menuItems: MenuItem[];
  collapsed: boolean;
  currentPath: string;
  onSignOut: () => void;
}

export const SidebarContent = ({
  menuItems,
  collapsed,
  currentPath,
  onSignOut,
}: SidebarContentProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full justify-between p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <SidebarMenuButton
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={currentPath === item.href}
            collapsed={collapsed}
            onClick={() => navigate(item.href)}
          />
        ))}
      </nav>

      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start text-secondary-foreground hover:bg-secondary-foreground/10 mt-auto",
          collapsed ? "px-2" : "px-4"
        )}
        onClick={onSignOut}
      >
        <LogOut className="h-5 w-5 mr-2" />
        {!collapsed && <span>Se Déconnecter</span>}
      </Button>
    </div>
  );
};