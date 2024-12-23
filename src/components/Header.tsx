import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { MainNav } from "./MainNav";
import { MainMenu } from "./navigation/MainMenu";
import { QuickActions } from "./navigation/QuickActions";
import { UserMenu } from "./navigation/UserMenu";
import { useTheme } from "./theme/theme-provider";
import { SearchBar } from "./search/SearchBar";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  
  const handleLogout = () => {
    // Implement logout logic
    console.log("Logging out...");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-4">
          <SearchBar />
        </div>

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
    </header>
  );
};
