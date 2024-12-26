import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Map, MessageSquare, Contact } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAuth } from "./auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function MainNav({ className, ...props }: MainNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { profile } = useAuth();
  const { toast } = useToast();

  const handleNavigation = (href: string) => {
    if (!profile && (href === "/messages")) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour accéder à cette page",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    navigate(href);
  };

  const navItems = [
    {
      href: "/",
      label: "Accueil",
      icon: Home
    },
    {
      href: "/about",
      label: "Qui sommes nous",
      icon: Contact
    },
    {
      href: "/map",
      label: "Carte",
      icon: Map
    },
    ...(profile ? [
      {
        href: "/messages",
        label: "Messagerie",
        icon: MessageSquare
      }
    ] : [])
  ];

  return (
    <nav 
      className={cn(
        "flex items-center space-x-4 lg:space-x-6", 
        isMobile && "flex-col items-start space-y-4 w-full",
        className
      )} 
      {...props}
    >
      {navItems.map(({ href, label, icon: Icon }) => (
        <div
          key={href}
          onClick={() => handleNavigation(href)}
          className={cn(
            "flex items-center space-x-3 text-sm font-medium transition-colors hover:text-primary relative group cursor-pointer w-full",
            location.pathname === href 
              ? "text-primary" 
              : "text-muted-foreground",
            isMobile && "px-4 py-2 hover:bg-accent rounded-md"
          )}
        >
          <Icon className="h-5 w-5 flex-shrink-0" />
          <span className="flex-1">{label}</span>
        </div>
      ))}
    </nav>
  );
}