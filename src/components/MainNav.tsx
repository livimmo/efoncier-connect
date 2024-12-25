import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Map, MessageSquare, Settings, HelpCircle } from "lucide-react";
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
    if (!profile && (href === "/messages" || href === "/settings")) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour accéder à cette page",
        variant: "destructive",
      });
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
      href: "/map",
      label: "Carte",
      icon: Map
    },
    ...(profile ? [
      {
        href: "/messages",
        label: "Messagerie",
        icon: MessageSquare
      },
      {
        href: "/settings",
        label: "Paramètres",
        icon: Settings
      }
    ] : []),
    {
      href: "/support",
      label: "Support",
      icon: HelpCircle
    }
  ];

  return (
    <nav 
      className={cn(
        "flex items-center space-x-4 lg:space-x-6", 
        isMobile && "flex-wrap justify-center gap-2",
        className
      )} 
      {...props}
    >
      {navItems.map(({ href, label, icon: Icon }) => (
        <div
          key={href}
          onClick={() => handleNavigation(href)}
          className={cn(
            "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary relative group cursor-pointer",
            location.pathname === href 
              ? "text-primary after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-0.5 after:bg-primary" 
              : "text-muted-foreground",
            isMobile && "flex-col items-center justify-center space-y-1 space-x-0 text-xs p-2"
          )}
        >
          <Icon className="h-5 w-5" />
          {!isMobile ? (
            <span>{label}</span>
          ) : (
            <span className="text-center whitespace-nowrap">{label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}