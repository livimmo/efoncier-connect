import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building, Home, Landmark } from "lucide-react";
import { UserRole } from "@/types/auth";

interface RoleSelectionProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const RoleSelection = ({ selectedRole, onRoleChange }: RoleSelectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      <Card 
        className={`cursor-pointer transition-colors hover:border-primary ${
          selectedRole === "owner" ? "border-primary" : ""
        }`}
        onClick={() => onRoleChange("owner")}
      >
        <CardHeader>
          <Home className="h-6 w-6 mb-2 text-primary" />
          <CardTitle className="text-sm">Propriétaire</CardTitle>
          <CardDescription className="text-xs">
            Gérez vos biens fonciers
          </CardDescription>
        </CardHeader>
      </Card>

      <Card 
        className={`cursor-pointer transition-colors hover:border-primary ${
          selectedRole === "developer" ? "border-primary" : ""
        }`}
        onClick={() => onRoleChange("developer")}
      >
        <CardHeader>
          <Building className="h-6 w-6 mb-2 text-primary" />
          <CardTitle className="text-sm">Promoteur</CardTitle>
          <CardDescription className="text-xs">
            Accédez aux opportunités
          </CardDescription>
        </CardHeader>
      </Card>

      <Card 
        className={`cursor-pointer transition-colors hover:border-primary ${
          selectedRole === "commune" ? "border-primary" : ""
        }`}
        onClick={() => onRoleChange("commune")}
      >
        <CardHeader>
          <Landmark className="h-6 w-6 mb-2 text-primary" />
          <CardTitle className="text-sm">Commune</CardTitle>
          <CardDescription className="text-xs">
            Gérez votre territoire
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};