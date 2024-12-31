import { Header } from "@/components/Header";
import { CommuneStatsWidget } from "@/components/commune/dashboard/CommuneStatsWidget";
import { CommuneMapWidget } from "@/components/commune/dashboard/CommuneMapWidget";
import { CommuneAlertsWidget } from "@/components/commune/dashboard/CommuneAlertsWidget";
import { Button } from "@/components/ui/button";
import { FileText, MapPin, BarChart3 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CommuneDashboard = () => {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && (!profile || profile.role !== "commune")) {
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Tableau de Bord</h1>
            <p className="text-muted-foreground mt-1">
              Commune de {profile?.city || "Non définie"}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => navigate("/commune/reports")}>
              <FileText className="mr-2 h-4 w-4" />
              Générer un Rapport
            </Button>
            <Button variant="outline" onClick={() => navigate("/commune/properties")}>
              <MapPin className="mr-2 h-4 w-4" />
              Voir la Carte
            </Button>
            <Button variant="outline" onClick={() => navigate("/commune/statistics")}>
              <BarChart3 className="mr-2 h-4 w-4" />
              Statistiques
            </Button>
          </div>
        </div>

        <CommuneStatsWidget />
        
        <div className="grid gap-6 md:grid-cols-3">
          <CommuneMapWidget />
          <CommuneAlertsWidget />
        </div>
      </main>
    </>
  );
};

export default CommuneDashboard;