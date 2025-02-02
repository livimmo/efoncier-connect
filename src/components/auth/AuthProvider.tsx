import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { User, UserRole } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  profile: User | null;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  signOut: async () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Gestionnaire pour la fermeture de la fenêtre
    const handleBeforeUnload = () => {
      localStorage.removeItem("isPrivateAuthenticated");
    };

    // Gestionnaire pour la visibilité de la page
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        localStorage.removeItem("isPrivateAuthenticated");
      }
    };

    // Ajout des écouteurs d'événements
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser.id) {
        parsedUser.id = crypto.randomUUID();
      }
      if (!parsedUser.first_name) {
        parsedUser.first_name = parsedUser.firstName || 'Utilisateur';
      }
      if (!parsedUser.last_name) {
        parsedUser.last_name = parsedUser.lastName || '';
      }
      setUser(parsedUser);
    }
    setLoading(false);

    // Nettoyage des écouteurs d'événements
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const signOut = async () => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem("isPrivateAuthenticated");
      setUser(null);
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
      navigate('/private-login');
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast({
        title: "Erreur",
        description: "Impossible de se déconnecter",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile: user, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export type { UserRole };