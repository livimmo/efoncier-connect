import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function MainNav({ className, ...props }: MainNavProps) {
  const location = useLocation();

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        to="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          location.pathname === "/" && "text-primary"
        )}
      >
        Accueil
      </Link>
      <Link
        to="/search"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          location.pathname === "/search" && "text-primary"
        )}
      >
        Recherche
      </Link>
      <Link
        to="/about"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          location.pathname === "/about" && "text-primary"
        )}
      >
        À propos
      </Link>
      <Link
        to="/contact"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          location.pathname === "/contact" && "text-primary"
        )}
      >
        Contact
      </Link>
    </nav>
  );
}