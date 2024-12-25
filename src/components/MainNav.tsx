import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Map, MessageSquare, Settings, HelpCircle } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAuth } from "./auth/AuthProvider";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function MainNav({ className, ...props }: MainNavProps) {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { profile } = useAuth();

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
        <Link
          key={href}
          to={href}
          className={cn(
            "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary relative group",
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
        </Link>
      ))}
    </nav>
  );
}