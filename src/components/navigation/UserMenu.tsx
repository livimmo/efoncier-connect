import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";

interface UserMenuProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  userName?: string;
}

export function UserMenu({ isAuthenticated, onLogout, onLoginClick, onRegisterClick, userName }: UserMenuProps) {
  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onRegisterClick}>
          <User className="mr-2 h-4 w-4" />
          S'inscrire
        </Button>
        <Button variant="default" onClick={onLoginClick}>
          Connexion
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm">
        Bienvenue, {userName || "Utilisateur"}
      </span>
      <Button variant="ghost" size="icon" onClick={onLogout}>
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}