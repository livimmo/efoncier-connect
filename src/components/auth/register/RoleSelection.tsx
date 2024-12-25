import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building, Home, Landmark } from "lucide-react";
import { UserRole } from "@/types/auth";
import { motion } from "framer-motion";

interface RoleSelectionProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const RoleSelection = ({ selectedRole, onRoleChange }: RoleSelectionProps) => {
  const roles = [
    {
      id: "owner",
      title: "Propriétaire",
      description: "Gérez vos biens fonciers et vos paiements TNB facilement",
      icon: Home,
    },
    {
      id: "developer",
      title: "Promoteur",
      description: "Découvrez et négociez des opportunités foncières en toute sécurité",
      icon: Building,
    },
    {
      id: "commune",
      title: "Commune",
      description: "Suivez et gérez les biens fonciers sous votre juridiction",
      icon: Landmark,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      {roles.map((role) => {
        const Icon = role.icon;
        return (
          <motion.div
            key={role.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedRole === role.id 
                  ? "border-primary bg-primary/5 shadow-md" 
                  : "hover:border-primary/50"
              }`}
              onClick={() => onRoleChange(role.id as UserRole)}
            >
              <CardHeader>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`p-3 rounded-full ${
                    selectedRole === role.id 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{role.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {role.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};