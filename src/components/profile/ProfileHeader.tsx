import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { UserRole } from "@/types/auth";

const roleLabels = {
  owner: "Propriétaire",
  admin: "Administrateur",
  commune: "Commune",
  developer: "Promoteur",
};

interface ProfileHeaderProps {
  profile: {
    first_name?: string;
    last_name?: string;
    role: UserRole;
    email?: string;
    phone?: string;
  };
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const fullName = [profile.first_name, profile.last_name]
    .filter(Boolean)
    .join(" ") || "Utilisateur";

  const initials = [profile.first_name?.[0], profile.last_name?.[0]]
    .filter(Boolean)
    .join("")
    .toUpperCase() || "U";

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder.svg" alt={fullName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{fullName}</h1>
                <Badge variant="secondary" className="mt-1">
                  {roleLabels[profile.role]}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
              {profile.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{profile.email}</span>
                </div>
              )}
              {profile.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{profile.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}