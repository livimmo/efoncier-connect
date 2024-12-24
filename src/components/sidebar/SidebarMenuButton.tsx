import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface SidebarMenuButtonProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  collapsed: boolean;
  onClick: () => void;
}

export const SidebarMenuButton = ({
  href,
  icon: Icon,
  label,
  isActive,
  collapsed,
  onClick,
}: SidebarMenuButtonProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start text-secondary-foreground hover:bg-secondary-foreground/10",
        collapsed ? "px-2" : "px-4",
        isActive && "bg-secondary-foreground/10"
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5 mr-2" />
      {!collapsed && <span>{label}</span>}
    </Button>
  );
};