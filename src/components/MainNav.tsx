import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Map, CreditCard, MessageSquare, HelpCircle, History } from "lucide-react";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function MainNav({ className, ...props }: MainNavProps) {
  const location = useLocation();

  const navItems = [
    {
      href: "/map",
      label: "Carte",
      icon: Map
    },
    {
      href: "/payment",
      label: "Paiements",
      icon: CreditCard
    },
    {
      href: "/history",
      label: "Historique",
      icon: History
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
        "flex md:items-center md:space-x-6 lg:space-x-8", 
        className
      )} 
      {...props}
    >
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          to={href}
          className={cn(
            "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary relative group w-full md:w-auto",
            location.pathname === href 
              ? "text-primary after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-0.5 after:bg-primary" 
              : "text-muted-foreground"
          )}
        >
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}