import { Key, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface AuthButtonsProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export const AuthButtons = ({ onLoginClick, onRegisterClick }: AuthButtonsProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  if (profile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10">
                {profile.first_name?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium">
                {profile.first_name} {profile.last_name}
              </p>
              <p className="text-sm text-muted-foreground">
                {profile.role === "taxpayer" ? "Contribuable" : 
                 profile.role === "developer" ? "Promoteur" : "Administrateur"}
              </p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/dashboard")}>
            Tableau de bord
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/profile")}>
            Mon profil
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/properties")}>
            Mes biens
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>
            Se déconnecter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        onClick={onLoginClick}
        className="gap-2"
      >
        <Key className="h-4 w-4" />
        {!isMobile && "Se Connecter"}
      </Button>
      <Button onClick={onRegisterClick}>
        {isMobile ? "Inscription" : "S'inscrire"}
      </Button>
    </div>
  );
};