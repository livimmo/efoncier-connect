import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";

const AdminDashboard = () => {
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
            <h1 className="text-2xl font-bold mb-2">Tableau de Bord Administrateur</h1>
            <p className="text-muted-foreground mb-6">
              Bienvenue, {profile?.first_name} {profile?.last_name}
            </p>
            
            <Tabs value={currentTab} className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="users">Utilisateurs</TabsTrigger>
                <TabsTrigger value="properties">Propriétés</TabsTrigger>
                <TabsTrigger value="reports">Rapports</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
                  <Card className="p-6">
                    <h3 className="font-semibold mb-2">Total Utilisateurs</h3>
                    <p className="text-3xl font-bold">1,234</p>
                  </Card>
                  <Card className="p-6">
                    <h3 className="font-semibold mb-2">Propriétés Enregistrées</h3>
                    <p className="text-3xl font-bold">5,678</p>
                  </Card>
                  <Card className="p-6">
                    <h3 className="font-semibold mb-2">Paiements du Mois</h3>
                    <p className="text-3xl font-bold">789</p>
                  </Card>
                  <Card className="p-6">
                    <h3 className="font-semibold mb-2">Demandes en Attente</h3>
                    <p className="text-3xl font-bold">45</p>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="users">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Gestion des Utilisateurs</h3>
                  <p className="text-muted-foreground">
                    Section de gestion des utilisateurs en cours de développement...
                  </p>
                </Card>
              </TabsContent>

              <TabsContent value="properties">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Gestion des Propriétés</h3>
                  <p className="text-muted-foreground">
                    Section de gestion des propriétés en cours de développement...
                  </p>
                </Card>
              </TabsContent>

              <TabsContent value="reports">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Rapports et Statistiques</h3>
                  <p className="text-muted-foreground">
                    Section des rapports en cours de développement...
                  </p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;