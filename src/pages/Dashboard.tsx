import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { profile, loading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading) {
      if (profile) {
        const dashboardRoutes = {
          owner: "/owner/dashboard",
          developer: "/developer/dashboard",
          commune: "/commune/dashboard",
          admin: "/admin/dashboard"
        };

        const route = dashboardRoutes[profile.role];
        if (route) {
          navigate(route, { replace: true });
        } else {
          toast({
            title: "Erreur",
            description: "Type d'utilisateur non reconnu",
            variant: "destructive",
          });
          navigate("/");
        }
      } else {
        toast({
          title: "Accès refusé",
          description: "Veuillez vous connecter pour accéder à votre tableau de bord",
          variant: "destructive",
        });
        navigate("/login");
      }
    }
  }, [profile, loading, navigate, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return null;
};

export default Dashboard;