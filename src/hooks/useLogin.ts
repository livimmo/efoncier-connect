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

    // Vérification plus précise des erreurs
    if (error.message?.includes("Invalid login credentials") || error.body?.includes("invalid_credentials")) {
      errorMessage = "Email ou mot de passe incorrect.";
    } else if (error.message?.includes("Email not confirmed")) {
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

      // Ajout de trim() pour éviter les espaces
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(), // Normalisation de l'email
        password,
      });

      if (error) {
        handleAuthError(error);
        return false;
      }

      if (user) {
        // Vérification du rôle de l'utilisateur
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          toast({
            variant: "destructive",
            title: "Erreur de connexion",
            description: "Impossible de vérifier le profil utilisateur.",
          });
          await supabase.auth.signOut();
          return false;
        }

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