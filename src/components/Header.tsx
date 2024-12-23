import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu, Search, Sun, Moon } from "lucide-react";
import { MainNav } from "./MainNav";
import { MainMenu } from "./navigation/MainMenu";
import { QuickActions } from "./navigation/QuickActions";
import { UserMenu } from "./navigation/UserMenu";
import { useTheme } from "./theme/theme-provider";
import { SearchModal } from "./search/SearchModal";
import { useState } from "react";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const handleLogout = () => {
    // Implement logout logic
    console.log("Logging out...");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MainNav className="flex flex-col gap-4" />
          </SheetContent>
        </Sheet>
        
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-transform hover:scale-105"
        >
          <img src="/logo.svg" alt="eFoncier" className="h-8 w-auto" />
          <span className="hidden font-bold sm:inline-block">
            eFoncier
          </span>
        </Link>

        {/* Main Menu */}
        <MainMenu />

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:bg-accent hover:text-accent-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Search Icon */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(true)}
            className="hover:bg-accent hover:text-accent-foreground"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Rechercher</span>
          </Button>

          {/* Quick Actions */}
          <QuickActions
            hasNotifications={true}
            hasMessages={false}
            hasPendingPayments={true}
          />

          {/* User Menu */}
          <UserMenu
            isAuthenticated={false}
            onLogout={handleLogout}
          />
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
};