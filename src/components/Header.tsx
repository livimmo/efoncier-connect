import { Logo } from "./Logo";
import { MainNav } from "./MainNav";
import { ModeToggle } from "./theme/mode-toggle";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { UserMenu } from "./navigation/UserMenu";
import { useTheme } from "./theme/theme-provider";
import { SearchModal } from "./search/SearchModal";
import { LoginDialog } from "./auth/LoginDialog";
import { RegisterDialog } from "./auth/RegisterDialog";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  
  const handleLogout = () => {
    // Implement logout logic
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Logo />
        
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <MainNav className="mx-6" />
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden ml-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] sm:w-[385px]">
              <div className="flex flex-col gap-4 py-4">
                <Logo />
                <MainNav className="flex-col items-start space-y-4" />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Rechercher"
          >
            <Search className="h-4 w-4" />
          </Button>
          
          <ModeToggle />
          
          <UserMenu
            isAuthenticated={false}
            onLogout={handleLogout}
            onLoginClick={() => setIsLoginOpen(true)}
            onRegisterClick={() => setIsRegisterOpen(true)}
          />
        </div>
      </div>

      {/* Modals */}
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