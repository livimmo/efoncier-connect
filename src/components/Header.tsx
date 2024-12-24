import { useState } from "react";
import { Logo } from "./Logo";
import { MainNav } from "./MainNav";
import { ModeToggle } from "./theme/mode-toggle";
import { Button } from "./ui/button";
import { Search, Bell, Menu } from "lucide-react";
import { SearchModal } from "./search/SearchModal";
import { LoginDialog } from "./auth/LoginDialog";
import { RegisterDialog } from "./auth/RegisterDialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Badge } from "./ui/badge";
import { useAuth } from "./auth/AuthProvider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { UserMenu } from "./header/UserMenu";
import { AuthButtons } from "./header/AuthButtons";
import { AddPropertyButton } from "./header/AddPropertyButton";

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { profile } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80vw] sm:w-[350px]">
                <MainNav className="flex-col items-start space-y-4 pt-4" />
              </SheetContent>
            </Sheet>
          )}
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
            <>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => navigate("/notifications")}
              >
                <Bell className="h-5 w-5" />
                <Badge 
                  variant="default"
                  className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary"
                >
                  3
                </Badge>
              </Button>
              <AddPropertyButton />
            </>
          )}
          
          <ModeToggle />
          {profile ? (
            <UserMenu />
          ) : (
            <AuthButtons 
              onLoginClick={() => setIsLoginOpen(true)}
              onRegisterClick={() => setIsRegisterOpen(true)}
            />
          )}
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