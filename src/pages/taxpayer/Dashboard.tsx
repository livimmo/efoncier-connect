import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { StatsWidget } from "@/components/dashboard/StatsWidget";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ParcelList } from "@/components/taxpayer/ParcelList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";

const TaxpayerDashboard = () => {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-6 mt-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">Tableau de Bord Contribuable</h1>
            <p className="text-muted-foreground mb-6">
              Bienvenue, {profile?.first_name} {profile?.last_name}
            </p>
            
            <Tabs value={currentTab} className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="parcels">Mes Parcelles</TabsTrigger>
                <TabsTrigger value="payments">Paiements</TabsTrigger>
                <TabsTrigger value="history">Historique</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <StatsWidget />
                <div className="grid gap-6 md:grid-cols-2">
                  <QuickActions />
                  <RecentActivity />
                </div>
              </TabsContent>

              <TabsContent value="parcels">
                <ParcelList />
              </TabsContent>

              <TabsContent value="payments">
                <div className="rounded-lg border bg-card p-8 text-card-foreground">
                  <h3 className="font-semibold mb-4">Paiements</h3>
                  <p className="text-muted-foreground">
                    Section des paiements en cours de développement...
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="history">
                <div className="rounded-lg border bg-card p-8 text-card-foreground">
                  <h3 className="font-semibold mb-4">Historique</h3>
                  <p className="text-muted-foreground">
                    Section de l'historique en cours de développement...
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TaxpayerDashboard;