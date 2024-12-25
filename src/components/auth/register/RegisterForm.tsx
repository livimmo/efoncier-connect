import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RegisterFormFields } from "./RegisterFormFields";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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
  city: z.string().min(1, "Veuillez sélectionner une ville"),
  role: z.enum(["taxpayer", "developer", "commune"]),
  firstName: z.string().min(2, "Le prénom est requis"),
  lastName: z.string().min(2, "Le nom est requis"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions d'utilisation",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof formSchema>;

export const RegisterForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      city: "",
      role: "taxpayer",
      firstName: "",
      lastName: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (values: RegisterFormData) => {
    try {
      console.log("Submitting registration form with values:", values);

      const { data, error } = await supabase.auth.signUp({
        email: values.email.trim(),
        password: values.password,
        options: {
          data: {
            role: values.role,
            first_name: values.firstName.trim(),
            last_name: values.lastName.trim(),
            phone: values.phone.trim(),
            city: values.city.trim(),
          }
        }
      });

      if (error) {
        console.error("Registration error:", error);
        throw error;
      }

      if (data.user) {
        console.log("Registration successful:", data);
        toast({
          title: "Compte créé avec succès !",
          description: "Veuillez vérifier votre boîte email pour activer votre compte.",
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Erreur lors de l'inscription",
        description: error.message || "Une erreur est survenue. Veuillez réessayer.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <RegisterFormFields form={form} />
        
        <div className="flex flex-col gap-4">
          <Button type="submit">
            Créer mon compte
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Vous avez déjà un compte ?{" "}
            <a href="/login" className="text-primary hover:underline">
              Connectez-vous ici
            </a>
          </p>
        </div>
      </form>
    </Form>
  );
};