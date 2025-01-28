import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const { toast } = useToast();

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (credentials.password !== "efonciermzz") {
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
      sessionStorage.setItem("isPrivateAuthenticated", "true");

      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur votre espace personnel",
      });

      // Get the return path from the location state or use role-specific dashboard
      const returnPath = location.state?.from?.pathname;
      
      if (returnPath && returnPath !== '/login' && returnPath !== '/') {
        navigate(returnPath);
      } else {
        // Redirection selon le rôle si pas de page de retour
        const dashboardRoutes = {
          developer: "/developer/dashboard",
          owner: "/owner/dashboard",
          commune: "/commune/dashboard",
          admin: "/admin/dashboard",
        };

        const route = dashboardRoutes[credentials.role];
        if (route) {
          navigate(route);
        } else {
          navigate("/dashboard");
        }
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