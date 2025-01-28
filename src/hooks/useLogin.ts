import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./use-toast";
import { UserRole } from "@/components/auth/AuthProvider";

interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (credentials.password !== "password123") {
        throw new Error("Identifiants invalides");
      }

      const user = {
        email: credentials.email,
        role: credentials.role,
        first_name: "Test",
        last_name: "User",
        id: crypto.randomUUID(),
      };

      localStorage.setItem("user", JSON.stringify(user));

      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur votre espace personnel",
      });

      if (credentials.role === "developer") {
        navigate("/developer/dashboard");
      } else if (credentials.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }

      return true;
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Erreur de connexion",
        description: error.message || "Une erreur est survenue",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};