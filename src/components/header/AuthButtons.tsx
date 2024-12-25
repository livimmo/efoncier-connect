import { Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";

interface AuthButtonsProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export const AuthButtons = ({ onLoginClick, onRegisterClick }: AuthButtonsProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

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