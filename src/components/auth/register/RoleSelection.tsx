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
      description: "Gérez et suivez vos biens fonciers",
      icon: Home,
    },
    {
      id: "developer",
      title: "Promoteur",
      description: "Recherchez et négociez les terrains disponibles",
      icon: Building,
    },
    {
      id: "commune",
      title: "Commune",
      description: "Surveillez et gérez les biens sous votre juridiction",
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className={`cursor-pointer transition-colors hover:border-primary ${
                selectedRole === role.id ? "border-primary bg-primary/5" : ""
              }`}
              onClick={() => onRoleChange(role.id as UserRole)}
            >
              <CardHeader>
                <Icon className="h-8 w-8 mb-2 text-primary" />
                <CardTitle className="text-lg">{role.title}</CardTitle>
                <CardDescription className="text-sm">
                  {role.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};