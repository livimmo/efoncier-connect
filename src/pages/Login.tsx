import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Building, Home, Building2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { UserRole } from "@/types/auth";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const navigate = useNavigate();

  const roles = [
    {
      id: "owner",
      title: "Propriétaire",
      description: "Accédez à vos biens et suivez vos transactions",
      icon: Home,
    },
    {
      id: "developer",
      title: "Promoteur",
      description: "Visualisez et négociez les biens disponibles",
      icon: Building,
    },
    {
      id: "commune",
      title: "Commune",
      description: "Gérez les statuts fiscaux et les biens sous votre juridiction",
      icon: Building2,
    },
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setShowLoginDialog(true);
  };

  return (
    <div className="min-h-screen bg-geometric-pattern bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/50" />
      
      <div className="container relative flex flex-col items-center justify-center min-h-screen py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl space-y-6 text-center"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">
              Se Connecter à eFoncier
            </h1>
            <p className="text-gray-200">
              Accédez à vos outils de gestion foncière en toute sécurité
            </p>
            <p className="text-sm text-gray-300">
              Veuillez sélectionner votre profil pour continuer
            </p>
          </div>

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
                    className="cursor-pointer transition-colors hover:border-primary bg-white/95 backdrop-blur-sm"
                    onClick={() => handleRoleSelect(role.id as UserRole)}
                  >
                    <CardHeader>
                      <Icon className="h-8 w-8 mb-2 text-primary mx-auto" />
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

          <p className="text-white">
            Pas encore de compte ?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-primary-foreground hover:text-primary-foreground/90 underline"
            >
              Créer un compte
            </button>
          </p>
        </motion.div>
      </div>

      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog} 
      />
    </div>
  );
};

export default Login;