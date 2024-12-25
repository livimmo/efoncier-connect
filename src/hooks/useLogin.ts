import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface LoginCredentials {
  email: string;
  password: string;
  role: string;
}

// Simulated users for testing
const TEST_USERS = [
  {
    email: "test@example.com",
    password: "password123",
    role: "taxpayer",
    firstName: "John",
    lastName: "Doe"
  },
  {
    email: "developer@example.com",
    password: "password123",
    role: "developer",
    firstName: "Jane",
    lastName: "Smith"
  }
];

export const useLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

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

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find matching test user
      const user = TEST_USERS.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.password === password &&
        u.role === role
      );

      if (!user) {
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect.",
        });
        return false;
      }

      // Store user info in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user));

      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur eFoncier !",
      });

      return true;
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Une erreur est survenue lors de la connexion.",
      });
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