import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterFormData, UserRole } from "@/types/auth";
import { RegisterFormFields } from "./RegisterFormFields";

const baseSchema = {
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
};

const ownerSchema = {
  ...baseSchema,
  cin: z.string().min(7, "CIN invalide"),
  address: z.string().min(5, "Adresse invalide"),
};

const developerSchema = {
  ...baseSchema,
  companyName: z.string().min(2, "Nom de société invalide"),
  ice: z.string().length(15, "ICE invalide"),
  rc: z.string().min(1, "RC invalide"),
  companyAddress: z.string().min(5, "Adresse invalide"),
};

const communeSchema = {
  ...baseSchema,
  communeName: z.string().min(2, "Nom de commune invalide"),
};

interface RegisterFormProps {
  selectedRole: UserRole;
  onSuccess: () => void;
}

export const RegisterForm = ({ selectedRole, onSuccess }: RegisterFormProps) => {
  const { toast } = useToast();

  const getSchemaForRole = (role: UserRole) => {
    switch (role) {
      case "owner":
        return z.object(ownerSchema);
      case "developer":
        return z.object(developerSchema);
      case "commune":
        return z.object(communeSchema);
      default:
        return z.object(baseSchema);
    }
  };

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(getSchemaForRole(selectedRole)),
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
      // Champs propriétaire
      cin: "",
      address: "",
      // Champs promoteur
      companyName: "",
      ice: "",
      rc: "",
      companyAddress: "",
      // Champs commune
      communeName: "",
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
        // Ajout des champs spécifiques selon le rôle
        ...(data.role === "owner" && {
          cin: data.cin,
          address: data.address,
        }),
        ...(data.role === "developer" && {
          companyName: data.companyName,
          ice: data.ice,
          rc: data.rc,
          companyAddress: data.companyAddress,
        }),
        ...(data.role === "commune" && {
          communeName: data.communeName,
        }),
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
        <RegisterFormFields form={form} selectedRole={selectedRole} />
        <Button type="submit" className="w-full">
          S'inscrire
        </Button>
      </form>
    </Form>
  );
};