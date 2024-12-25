import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RegisterFormData, UserRole } from "@/types/auth";

export const useRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthError = (error: any) => {
    console.error("Registration error:", error);
    let errorMessage = "Une erreur est survenue lors de l'inscription.";

    switch (error.message) {
      case "User already registered":
        errorMessage = "Cette adresse email est déjà utilisée.";
        break;
      case "Password should be at least 6 characters":
        errorMessage = "Le mot de passe doit contenir au moins 6 caractères.";
        break;
      case "Email not confirmed":
        errorMessage = "Veuillez vérifier votre email pour confirmer votre compte.";
        break;
      case "Invalid email":
        errorMessage = "L'adresse email n'est pas valide.";
        break;
      case "email_provider_disabled":
        errorMessage = "L'authentification par email est désactivée. Veuillez contacter l'administrateur.";
        break;
    }

    toast({
      variant: "destructive",
      title: "Erreur lors de l'inscription",
      description: errorMessage,
    });
  };

  const register = async (values: RegisterFormData) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email: values.email.trim(),
        password: values.password,
        options: {
          data: {
            role: values.role as UserRole,
            first_name: values.firstName.trim(),
            last_name: values.lastName.trim(),
            phone: values.phone.trim()
          }
        }
      });

      if (error) {
        handleAuthError(error);
        return false;
      }

      if (data.user) {
        toast({
          title: "Compte créé avec succès !",
          description: "Veuillez vérifier votre boîte email pour activer votre compte.",
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
    register,
    isLoading
  };
};