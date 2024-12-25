import { useState } from "react";
import { Logo } from "./Logo";
import { MainNav } from "./MainNav";
import { ModeToggle } from "./theme/mode-toggle";
import { SearchModal } from "./search/SearchModal";
import { LoginDialog } from "./auth/LoginDialog";
import { RegisterDialog } from "./auth/RegisterDialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAuth } from "./auth/AuthProvider";
import { UserMenu } from "./header/UserMenu";
import { AuthButtons } from "./header/AuthButtons";
import { MobileMenu } from "./header/MobileMenu";
import { NotificationsArea } from "./header/NotificationsArea";

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { profile } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {isMobile && (
            <MobileMenu 
              isOpen={isMobileMenuOpen}
              setIsOpen={setIsMobileMenuOpen}
            />
          )}
          <Logo />
          {!isMobile && <MainNav className="mx-6" />}
        </div>

        <div className="flex items-center gap-2">
          {profile && <NotificationsArea />}
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