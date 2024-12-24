import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/components/auth/AuthProvider";
import { UserMenuContent } from "./UserMenuContent";

export const UserMenu = () => {
  const { profile } = useAuth();

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "U";
    return `${(firstName?.[0] || "").toUpperCase()}${(lastName?.[0] || "").toUpperCase()}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-8 w-8 rounded-full"
          aria-label="Menu utilisateur"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10">
              {getInitials(profile?.first_name, profile?.last_name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <UserMenuContent />
    </DropdownMenu>
  );
};