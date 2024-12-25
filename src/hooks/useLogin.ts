import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LoginCredentials {
  email: string;
  password: string;
  role: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthError = (error: any) => {
    console.error("Login error:", error);
    let errorMessage = "Une erreur est survenue lors de la connexion.";

    switch (error.message) {
      case "Invalid login credentials":
        errorMessage = "Email ou mot de passe incorrect.";
        break;
      case "Email not confirmed":
        errorMessage = "Veuillez vérifier votre email pour confirmer votre compte.";
        break;
      case "Invalid email":
        errorMessage = "L'adresse email n'est pas valide.";
        break;
      default:
        errorMessage = "Une erreur est survenue lors de la connexion.";
    }

    toast({
      variant: "destructive",
      title: "Erreur de connexion",
      description: errorMessage,
    });
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email.trim(),
        password: credentials.password,
      });

      if (error) {
        handleAuthError(error);
        return false;
      }

      if (data.user) {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur eFoncier !",
        });
        navigate("/dashboard");
        return true;
      }

      return false;
    } catch (error: any) {
      handleAuthError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading
  };
};