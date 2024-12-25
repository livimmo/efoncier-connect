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

    if (error.message.includes("duplicate key")) {
      errorMessage = "Cette adresse email est déjà utilisée.";
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
            phone: values.phone.trim(),
            city: values.city?.trim()
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