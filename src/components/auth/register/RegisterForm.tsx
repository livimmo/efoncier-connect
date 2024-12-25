import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterFormData, UserRole } from "@/types/auth";
import { RegisterFormFields } from "@/components/auth/RegisterFormFields";

const formSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  confirmPassword: z.string(),
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string(),
  city: z.string(),
  role: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions d'utilisation",
  }),
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
  const navigate = useNavigate();

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
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Store user data in localStorage
      const userData = {
        id: crypto.randomUUID(),
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        role: data.role,
        phone: data.phone,
        city: data.city,
      };
      
      localStorage.setItem('user', JSON.stringify(userData));

      toast({
        title: "Inscription réussie",
        description: "Vous pouvez maintenant vous connecter",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <RegisterFormFields form={form} />
        <Button type="submit" className="w-full">
          S'inscrire
        </Button>
      </form>
    </Form>
  );
};