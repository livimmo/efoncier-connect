import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterFormData, UserRole } from "@/types/auth";
import { RegisterFormFields } from "./RegisterFormFields";

const formSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial"
    ),
  confirmPassword: z.string(),
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  city: z.string().min(2, "La ville est requise"),
  role: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions d'utilisation",
  }),
  // Champs optionnels selon le rôle
  companyName: z.string().optional(),
  registrationNumber: z.string().optional(),
  communeName: z.string().optional(),
  region: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

interface RegisterFormProps {
  selectedRole: UserRole;
  onSuccess: () => void;
}

export const RegisterForm = ({ selectedRole, onSuccess }: RegisterFormProps) => {
  const { toast } = useToast();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      city: "",
      role: selectedRole,
      acceptTerms: false,
      companyName: "",
      registrationNumber: "",
      communeName: "",
      region: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Store user data in localStorage for demo
      const userData = {
        id: crypto.randomUUID(),
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        role: data.role,
        phone: data.phone,
        city: data.city,
        companyName: data.companyName,
        registrationNumber: data.registrationNumber,
        communeName: data.communeName,
        region: data.region,
      };
      
      localStorage.setItem('user', JSON.stringify(userData));

      toast({
        title: "Inscription réussie !",
        description: "Veuillez vérifier votre boîte e-mail pour activer votre compte.",
      });

      onSuccess();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
        <RegisterFormFields form={form} />
        
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => form.reset()}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Réinitialiser
          </Button>
          <Button 
            type="submit" 
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            S'inscrire
          </Button>
        </div>
      </form>
    </Form>
  );
};