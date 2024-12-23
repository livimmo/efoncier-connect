import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Map, Bell, Settings, HelpCircle, Languages, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function MainNav() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("FR");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <div className="flex items-center space-x-4">
      <NavigationMenu>
        <NavigationMenuList>
          {/* Services Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px]">
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="ghost" 
                    className="justify-start space-x-2"
                    onClick={() => navigate("/map")}
                  >
                    <Map className="w-4 h-4" />
                    <span>Carte Interactive</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start space-x-2"
                    onClick={() => navigate("/payments")}
                  >
                    <Bell className="w-4 h-4" />
                    <span>Paiements</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start space-x-2"
                    onClick={() => navigate("/documents")}
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Documents</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start space-x-2"
                    onClick={() => navigate("/settings")}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Paramètres</span>
                  </Button>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Resources Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Ressources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px]">
                <div className="grid grid-cols-1 gap-2">
                  <Button 
                    variant="ghost" 
                    className="justify-start"
                    onClick={() => navigate("/faq")}
                  >
                    FAQ
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start"
                    onClick={() => navigate("/guides")}
                  >
                    Guides Utilisateurs
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start"
                    onClick={() => navigate("/tutorials")}
                  >
                    Tutoriels Vidéo
                  </Button>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex-1 max-w-sm">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une parcelle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </form>

      {/* Quick Actions */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDarkMode(!isDarkMode)}
          title={isDarkMode ? "Mode clair" : "Mode sombre"}
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentLanguage(currentLanguage === "FR" ? "AR" : "FR")}
          title="Changer de langue"
        >
          <Languages className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/notifications")}
          className="relative"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-[10px] rounded-full flex items-center justify-center text-white">
            3
          </span>
        </Button>
      </div>
    </div>
  );
}