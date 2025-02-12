import { Header } from "@/components/Header";
import { StatsWidget } from "@/components/dashboard/StatsWidget";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { useAuth } from "@/components/auth/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && (!profile || profile.role !== "admin")) {
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas accès à cette page",
        variant: "destructive",
      });
      navigate("/", { replace: true });
    }
  }, [profile, loading, navigate, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto p-6 mt-16 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Tableau de Bord Administrateur</h1>
            <p className="text-muted-foreground mt-1">
              Gérez l'ensemble de la plateforme
            </p>
          </div>
        </div>

        <StatsWidget />
        
        <div className="grid gap-6 md:grid-cols-2">
          <QuickActions />
          <RecentActivity />
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;