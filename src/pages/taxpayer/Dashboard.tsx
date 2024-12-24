import { Header } from "@/components/Header";
import { StatsWidget } from "@/components/dashboard/StatsWidget";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ParcelList } from "@/components/taxpayer/ParcelList";
import { PaymentHistory } from "@/components/taxpayer/PaymentHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { ProfileNavigation } from "@/components/profile/ProfileNavigation";
import { ProfileStats } from "@/components/profile/ProfileStats";

const TaxpayerDashboard = () => {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";
  const { profile } = useAuth();
  const navigate = useNavigate();

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-6 mt-16 container mx-auto max-w-7xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Tableau de Bord Contribuable</h1>
            <p className="text-muted-foreground mb-6">
              Bienvenue, {profile?.first_name} {profile?.last_name}
            </p>
          </div>

          <ProfileNavigation />
          
          <Tabs value={currentTab} className="space-y-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger 
                value="overview"
                onClick={() => navigate("?tab=overview")}
              >
                Vue d'ensemble
              </TabsTrigger>
              <TabsTrigger 
                value="properties"
                onClick={() => navigate("?tab=properties")}
              >
                Mes Parcelles
              </TabsTrigger>
              <TabsTrigger 
                value="payments"
                onClick={() => navigate("?tab=payments")}
              >
                Paiements
              </TabsTrigger>
              <TabsTrigger 
                value="history"
                onClick={() => navigate("?tab=history")}
              >
                Historique
              </TabsTrigger>
              <TabsTrigger 
                value="settings"
                onClick={() => navigate("?tab=settings")}
              >
                Paramètres
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <ProfileStats profile={profile} />
              <div className="grid gap-6 md:grid-cols-2">
                <QuickActions />
                <RecentActivity />
              </div>
            </TabsContent>

            <TabsContent value="properties">
              <ParcelList />
            </TabsContent>

            <TabsContent value="payments">
              <PaymentHistory />
            </TabsContent>

            <TabsContent value="history">
              <PaymentHistory />
            </TabsContent>

            <TabsContent value="settings">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Paramètres du compte</h3>
                <p className="text-muted-foreground">
                  Cette section sera bientôt disponible.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default TaxpayerDashboard;