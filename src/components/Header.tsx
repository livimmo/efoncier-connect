import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bell, Globe, Lock, LogIn, Menu, Moon, Sun, User, X } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MainNav } from "./MainNav";
import { LoginDialog } from "./auth/LoginDialog";
import { useTheme } from "./theme/theme-provider";
import { cn } from "@/lib/utils";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
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
        
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="eFoncier" className="h-8 w-auto" />
            <span className="hidden font-bold sm:inline-block">
              eFoncier
            </span>
          </Link>
        </div>

        <MainNav className="mx-6 hidden md:flex" />
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/notifications")}
              className={cn(
                "relative",
                location.pathname === "/notifications" && "bg-accent"
              )}
            >
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLoginOpen(true)}
            >
              <LogIn className="h-5 w-5" />
              <span className="sr-only">Login</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/register")}
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Register</span>
            </Button>

            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
              <span className="sr-only">Change language</span>
            </Button>
          </nav>
        </div>
      </div>

      <LoginDialog open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </header>
  );
};