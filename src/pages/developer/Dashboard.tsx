import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";

const DeveloperDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentTab = searchParams.get("tab") || "overview";
  const { profile } = useAuth();

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-6 mt-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">Tableau de Bord Développeur</h1>
            <p className="text-muted-foreground mb-6">
              Bienvenue, {profile?.first_name} {profile?.last_name}
            </p>
            
            <Tabs value={currentTab} onValueChange={handleTabChange} className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="projects">Projets</TabsTrigger>
                <TabsTrigger value="permits">Permis</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                  <Card className="p-6">
                    <h3 className="font-semibold mb-2">Projets en cours</h3>
                    <p className="text-3xl font-bold">12</p>
                  </Card>
                  <Card className="p-6">
                    <h3 className="font-semibold mb-2">Permis en attente</h3>
                    <p className="text-3xl font-bold">3</p>
                  </Card>
                  <Card className="p-6">
                    <h3 className="font-semibold mb-2">Documents à traiter</h3>
                    <p className="text-3xl font-bold">7</p>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="projects">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Mes Projets</h3>
                  <p className="text-muted-foreground">
                    Section des projets en cours de développement...
                  </p>
                </Card>
              </TabsContent>

              <TabsContent value="permits">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Gestion des Permis</h3>
                  <p className="text-muted-foreground">
                    Section des permis en cours de développement...
                  </p>
                </Card>
              </TabsContent>

              <TabsContent value="documents">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Documents</h3>
                  <p className="text-muted-foreground">
                    Section des documents en cours de développement...
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

export default DeveloperDashboard;