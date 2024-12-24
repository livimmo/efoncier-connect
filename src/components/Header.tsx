import { Logo } from "./Logo";
import { MainNav } from "./MainNav";
import { ModeToggle } from "./theme/mode-toggle";
import { Button } from "./ui/button";
import { Search, Bell } from "lucide-react";
import { UserMenu } from "./navigation/UserMenu";
import { useTheme } from "./theme/theme-provider";
import { SearchModal } from "./search/SearchModal";
import { LoginDialog } from "./auth/LoginDialog";
import { RegisterDialog } from "./auth/RegisterDialog";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Badge } from "./ui/badge";
import { useAuth } from "./auth/AuthProvider";

export const Header = () => {
  const { theme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { profile } = useAuth();
  
  const handleLogout = () => {
    // Implement logout logic
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
                variant="primary" 
                className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
              >
                3
              </Badge>
            </Button>
          )}
          
          <ModeToggle />
          
          <UserMenu
            isAuthenticated={!!profile}
            onLogout={handleLogout}
            onLoginClick={() => setIsLoginOpen(true)}
            onRegisterClick={() => setIsRegisterOpen(true)}
          />
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