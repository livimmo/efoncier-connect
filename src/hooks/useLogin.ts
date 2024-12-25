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

    if (error.message.includes("Invalid login credentials")) {
      errorMessage = "Email ou mot de passe incorrect.";
    } else if (error.message.includes("Email not confirmed")) {
      errorMessage = "Veuillez vérifier votre email pour confirmer votre compte.";
    }

    toast({
      variant: "destructive",
      title: "Erreur de connexion",
      description: errorMessage,
    });
  };

  const login = async ({ email, password, role }: LoginCredentials): Promise<boolean> => {
    if (!email || !password || !role) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Veuillez remplir tous les champs.",
      });
      return false;
    }

    try {
      setIsLoading(true);
      console.log("Attempting login with role:", role);

      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        handleAuthError(error);
        return false;
      }

      if (user) {
        // Check if the user's role matches the selected role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profile && profile.role !== role) {
          toast({
            variant: "destructive",
            title: "Erreur de connexion",
            description: "Le type de compte sélectionné ne correspond pas à votre profil.",
          });
          await supabase.auth.signOut();
          return false;
        }

        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur eFoncier !",
        });
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