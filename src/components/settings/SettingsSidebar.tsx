import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types/auth";
import { 
  User, 
  Shield, 
  Bell, 
  Settings, 
  Key, 
  LogOut 
} from "lucide-react";

interface SettingsSidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  userRole?: UserRole;
}

export const SettingsSidebar = ({
  currentSection,
  onSectionChange,
  userRole
}: SettingsSidebarProps) => {
  const menuItems = [
    {
      id: "personal",
      label: "Profil Personnel",
      icon: User,
      roles: ["owner", "developer", "commune", "admin"]
    },
    {
      id: "security",
      label: "Sécurité et Confidentialité",
      icon: Shield,
      roles: ["owner", "developer", "commune", "admin"]
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      roles: ["owner", "developer", "commune", "admin"]
    },
    {
      id: "advanced",
      label: "Paramètres Avancés",
      icon: Settings,
      roles: ["developer", "commune", "admin"]
    }
  ];

  const filteredItems = menuItems.filter(
    item => !userRole || item.roles.includes(userRole)
  );

  return (
    <div className="space-y-2">
      {filteredItems.map((item) => (
        <Button
          key={item.id}
          variant="ghost"
          className={cn(
            "w-full justify-start",
            currentSection === item.id && "bg-muted"
          )}
          onClick={() => onSectionChange(item.id)}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.label}
        </Button>
      ))}
      
      <Button
        variant="ghost"
        className="w-full justify-start text-destructive hover:text-destructive"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Déconnexion
      </Button>
    </div>
  );
};