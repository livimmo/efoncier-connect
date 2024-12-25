import { RegisterForm } from "@/components/auth/register/RegisterForm";
import { UserRole } from "@/types/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Créer un compte</h1>
        <RegisterForm 
          selectedRole="owner" 
          onSuccess={() => navigate("/login")} 
        />
      </div>
    </div>
  );
}