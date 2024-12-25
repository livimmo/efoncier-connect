import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "@/components/auth/register/RegisterForm";
import { RoleSelection } from "@/components/auth/register/RoleSelection";
import { UserRole } from "@/types/auth";
import { Logo } from "@/components/Logo";

export default function Register() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("owner");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Logo />
          <h1 className="text-2xl font-bold tracking-tight">
            Créer votre compte eFoncier
          </h1>
          <p className="text-sm text-muted-foreground">
            Rejoignez notre plateforme pour gérer efficacement vos biens fonciers
          </p>
        </div>

        <div className="grid gap-6">
          <div className="space-y-4">
            <RoleSelection 
              selectedRole={selectedRole}
              onRoleChange={setSelectedRole}
            />

            <RegisterForm 
              selectedRole={selectedRole}
              onSuccess={() => {
                navigate("/dashboard");
              }}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Déjà inscrit ?
              </span>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-primary hover:underline"
            >
              Se connecter à votre compte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}