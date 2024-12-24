import { useState } from "react";
import { Logo } from "./Logo";
import { MainNav } from "./MainNav";
import { ModeToggle } from "./theme/mode-toggle";
import { Button } from "./ui/button";
import { Search, Bell, Key, Home, Settings, CreditCard, Database, LogOut } from "lucide-react";
import { useTheme } from "./theme/theme-provider";
import { SearchModal } from "./search/SearchModal";
import { LoginDialog } from "./auth/LoginDialog";
import { RegisterDialog } from "./auth/RegisterDialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Badge } from "./ui/badge";
import { useAuth } from "./auth/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";

export const Header = () => {
  const { theme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion",
        variant: "destructive",
      });
    }
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "U";
    return `${(firstName?.[0] || "").toUpperCase()}${(lastName?.[0] || "").toUpperCase()}`;
  };

  const getFullName = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "Utilisateur";
    return `${firstName || ""} ${lastName || ""}`.trim();
  };

  const renderAuthButtons = () => {
    if (profile) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="relative h-8 w-8 rounded-full"
              aria-label="Menu utilisateur"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10">
                  {getInitials(profile.first_name, profile.last_name)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-56" 
            align="end"
            sideOffset={5}
          >
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">
                  {getFullName(profile.first_name, profile.last_name)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {profile.role === "taxpayer" ? "Contribuable" : 
                   profile.role === "developer" ? "Promoteur" : "Administrateur"}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/dashboard")}>
              <Home className="mr-2 h-4 w-4" />
              <span>Tableau de Bord</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/profile?tab=settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Paramètres</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/history")}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Historique des Paiements</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/profile?tab=properties")}>
              <Database className="mr-2 h-4 w-4" />
              <span>Mes Biens</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Se Déconnecter</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          onClick={() => setIsLoginOpen(true)}
          className="gap-2"
        >
          <Key className="h-4 w-4" />
          Se Connecter
        </Button>
        <Button onClick={() => setIsRegisterOpen(true)}>
          S'inscrire
        </Button>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Logo />
          {!isMobile && <MainNav className="mx-6" />}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {profile && (
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => {/* Handle notifications */}}
            >
              <Bell className="h-5 w-5" />
              <Badge 
                variant="default"
                className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-secondary"
              >
                3
              </Badge>
            </Button>
          )}
          
          <ModeToggle />
          {renderAuthButtons()}
        </div>
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <LoginDialog
        open={isLoginOpen}
        onOpenChange={setIsLoginOpen}
      />

      <RegisterDialog
        open={isRegisterOpen}
        onOpenChange={setIsRegisterOpen}
      />
    </header>
  );
};