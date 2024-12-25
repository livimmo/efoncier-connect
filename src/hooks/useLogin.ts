import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./use-toast";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (email: string, password: string, role: string) => {
    setLoading(true);
    try {
      // Simuler une vérification des identifiants
      if (password !== "password123") {
        throw new Error("Identifiants invalides");
      }

      // Créer un utilisateur simulé
      const user = {
        email,
        role,
        first_name: "Test",
        last_name: "User",
      };

      // Stocker l'utilisateur dans le localStorage
      localStorage.setItem("user", JSON.stringify(user));

      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur votre espace personnel",
      });

      // Rediriger vers le tableau de bord approprié
      if (role === "developer") {
        navigate("/developer/dashboard");
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Erreur de connexion",
        description: error.message || "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};