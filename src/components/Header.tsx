import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Bell, 
  Globe, 
  LogIn, 
  Menu, 
  Moon, 
  Sun, 
  User, 
  Search,
  MessageSquare,
  CreditCard,
  Map,
  HelpCircle,
  ChevronDown
} from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MainNav } from "./MainNav";
import { LoginDialog } from "./auth/LoginDialog";
import { useTheme } from "./theme/theme-provider";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "./ui/input";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="eFoncier" className="h-8 w-auto" />
            <span className="hidden font-bold sm:inline-block">
              eFoncier
            </span>
          </Link>
        </div>

        {/* Main Navigation */}
        <MainNav className="mx-6 hidden md:flex" />
        
        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une parcelle, ville, quartier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
        </div>
        
        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="hidden md:flex"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          {/* Messages */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/messages")}
            className="hidden md:flex"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Button>

          {/* Notifications */}
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

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Français</DropdownMenuItem>
              <DropdownMenuItem>العربية</DropdownMenuItem>
              <DropdownMenuItem>English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Quick Actions */}
          <Button
            variant="default"
            className="hidden md:flex"
            onClick={() => navigate("/payment")}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Payer maintenant
          </Button>

          {/* User Menu / Login */}
          {false ? ( // Replace with actual auth check
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hidden md:flex">
                  <User className="mr-2 h-4 w-4" />
                  <span>John Doe</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Mon Profil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  Paramètres
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {/* handle logout */}}>
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              onClick={() => setIsLoginOpen(true)}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Connexion
            </Button>
          )}
        </div>
      </div>

      <LoginDialog open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </header>
  );
};