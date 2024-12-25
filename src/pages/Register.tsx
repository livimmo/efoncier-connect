import { Header } from "@/components/Header";
import { RoleSelection } from "@/components/auth/register/RoleSelection";
import { RegisterForm } from "@/components/auth/register/RegisterForm";
import { useState } from "react";
import { UserRole } from "@/types/auth";

const Register = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>("taxpayer");

  return (
    <div className="min-h-screen bg-background auth-page">
      <Header />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <img src="/logo.svg" alt="eFoncier" className="h-12 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Créez votre compte sur eFoncier
            </h1>
            <p className="text-muted-foreground">
              Inscrivez-vous pour gérer vos terrains, vos paiements fiscaux et accéder aux opportunités foncières.
            </p>
          </div>

          {/* Role Selection */}
          <RoleSelection 
            selectedRole={selectedRole} 
            onRoleChange={setSelectedRole} 
          />

          {/* Registration Form */}
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;