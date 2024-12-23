import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Map, CreditCard, MessageSquare, HelpCircle, Users } from "lucide-react";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function MainNav({ className, ...props }: MainNavProps) {
  const location = useLocation();

  const navItems = [
    {
      href: "/",
      label: "Accueil",
      icon: Home
    },
    {
      href: "/search",
      label: "Carte",
      icon: Map
    },
    {
      href: "/payment",
      label: "Paiements",
      icon: CreditCard
    },
    {
      href: "/directory",
      label: "Annuaire",
      icon: Users
    },
    {
      href: "/messages",
      label: "Messages",
      icon: MessageSquare
    },
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
        className
      )} 
      {...props}
    >
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          to={href}
          className={cn(
            "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
            location.pathname === href 
              ? "text-primary" 
              : "text-muted-foreground"
          )}
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}