import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, MapPin, CreditCard, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileFooterMenu } from "./MobileFooterMenu";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";

export const MobileFooter = () => {
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { toast } = useToast();
  const { profile } = useAuth();

  if (!isMobile) return null;

  const menuItems = [
    {
      icon: Home,
      label: "Accueil",
      path: "/",
    },
    {
      icon: MapPin,
      label: "Carte",
      path: "/map",
    },
    {
      icon: Bell,
      label: "Notifications",
      path: "/notifications",
      badge: true,
      onClick: () => {
        navigate("/notifications");
        toast({
          title: "Notifications",
          description: "Chargement de vos notifications...",
        });
      },
    },
    {
      icon: CreditCard,
      label: "Paiements",
      path: "/payment",
    },
    {
      icon: User,
      label: "Profil",
      path: "/profile",
    },
  ];

  return (
    <>
      <div className="h-16 md:hidden" /> {/* Spacer */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
        <div className="flex h-16 items-center justify-around px-4">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => item.onClick ? item.onClick() : navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-lg p-1.5 text-muted-foreground transition-colors hover:text-primary relative",
                location.pathname === item.path && "text-primary"
              )}
            >
              <div className="relative">
                <item.icon className="h-5 w-5" />
                {item.badge && (
                  <Badge 
                    variant="default"
                    className="absolute -right-1 -top-1 h-2 w-2 p-0 bg-primary animate-pulse"
                  />
                )}
              </div>
              <span className="text-[10px]">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};