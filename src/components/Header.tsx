import { useState, useEffect } from "react";
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
  X,
  ChevronDown,
  MapPin,
  Filter
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
import { mockParcels } from "@/utils/mockData";

const searchPlaceholders = [
  "Recherchez par titre foncier...",
  "Trouvez un terrain par ville...",
  "Recherchez un propriétaire...",
];

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(searchPlaceholders[0]);
  const [searchResults, setSearchResults] = useState<typeof mockParcels>([]);

  // Rotate placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder(prev => {
        const currentIndex = searchPlaceholders.indexOf(prev);
        return searchPlaceholders[(currentIndex + 1) % searchPlaceholders.length];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const results = mockParcels.filter(parcel => 
        parcel.titleDeedNumber.toLowerCase().includes(query.toLowerCase()) ||
        parcel.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        parcel.title.toLowerCase().includes(query.toLowerCase()) ||
        parcel.city.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  // Handle click outside search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.getElementById("search-container");
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        {/* Search Bar */}
        <div 
          id="search-container"
          className="relative hidden md:flex flex-1 max-w-2xl mx-4"
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={currentPlaceholder}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9 pr-12 w-full transition-all focus:ring-2 focus:ring-primary"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-6 w-6"
                onClick={() => {
                  setSearchQuery("");
                  setShowSearchResults(false);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && (
            <div className="absolute top-full left-0 w-full mt-1 bg-background border rounded-lg shadow-lg overflow-hidden">
              {searchResults.length > 0 ? (
                <div className="max-h-[400px] overflow-y-auto">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="p-3 hover:bg-accent cursor-pointer border-b last:border-0 flex items-center justify-between"
                      onClick={() => {
                        navigate(`/parcels/${result.id}`);
                        setShowSearchResults(false);
                      }}
                    >
                      <div>
                        <h4 className="font-medium">{result.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {result.titleDeedNumber} - {result.city}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MapPin className="h-4 w-4 mr-1" />
                          Voir
                        </Button>
                        <Button size="sm" variant="outline">
                          <CreditCard className="h-4 w-4 mr-1" />
                          Payer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  Aucun résultat trouvé
                </div>
              )}
            </div>
          )}
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