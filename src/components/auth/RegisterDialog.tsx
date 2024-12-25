import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { RegisterFormFields } from "./RegisterFormFields";
import { supabase } from "@/integrations/supabase/client";
import { RegisterFormData, UserRole } from "@/types/auth";

const formSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
    ),
  confirmPassword: z.string(),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  role: z.enum(["taxpayer", "developer", "commune"] as const),
  firstName: z.string().min(2, "Le prénom est requis"),
  lastName: z.string().min(2, "Le nom est requis"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

interface RegisterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RegisterDialog({ open, onOpenChange }: RegisterDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      role: "taxpayer",
      firstName: "",
      lastName: "",
    },
  });

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

  const onSubmit = async (values: RegisterFormData) => {
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
        return;
      }

      if (data.user) {
        toast({
          title: "Compte créé avec succès !",
          description: "Veuillez vérifier votre boîte email pour activer votre compte.",
        });
        onOpenChange(false);
        navigate("/dashboard");
      }
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Créer votre compte eFoncier</DialogTitle>
          <DialogDescription>
            Inscrivez-vous pour accéder à toutes les fonctionnalités
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <RegisterFormFields form={form} />

            <div className="flex flex-col gap-4 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Création en cours..." : "Créer mon compte"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Annuler
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}