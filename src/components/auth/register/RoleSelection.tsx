import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building, Home, Shield } from "lucide-react";
import { UserRole } from "@/types/auth";

interface RoleSelectionProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const RoleSelection = ({ selectedRole, onRoleChange }: RoleSelectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card 
        className={`cursor-pointer transition-colors ${
          selectedRole === "taxpayer" ? "border-primary" : ""
        }`}
        onClick={() => onRoleChange("taxpayer")}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Propriétaire
          </CardTitle>
          <CardDescription>
            Gérez vos biens fonciers et vos paiements
          </CardDescription>
        </CardHeader>
      </Card>

      <Card 
        className={`cursor-pointer transition-colors ${
          selectedRole === "developer" ? "border-primary" : ""
        }`}
        onClick={() => onRoleChange("developer")}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Promoteur
          </CardTitle>
          <CardDescription>
            Découvrez les meilleures opportunités foncières
          </CardDescription>
        </CardHeader>
      </Card>

      <Card 
        className={`cursor-pointer transition-colors ${
          selectedRole === "commune" ? "border-primary" : ""
        }`}
        onClick={() => onRoleChange("commune")}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Administrateur
          </CardTitle>
          <CardDescription>
            Accès pour la gestion du système
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};