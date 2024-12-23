import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-6 mt-16">
          <h1 className="text-2xl font-bold mb-6">Tableau de Bord</h1>
          
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="properties">Mes Propriétés</TabsTrigger>
              <TabsTrigger value="payments">Paiements</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">Propriétés</h3>
                  <p className="text-3xl font-bold">3</p>
                  <p className="text-sm text-gray-500">Terrains enregistrés</p>
                </Card>
                
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">Paiements en attente</h3>
                  <p className="text-3xl font-bold text-primary">25 000 MAD</p>
                  <p className="text-sm text-gray-500">Total dû</p>
                </Card>
                
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">Messages</h3>
                  <p className="text-3xl font-bold">2</p>
                  <p className="text-sm text-gray-500">Non lus</p>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="properties">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Mes Propriétés</h3>
                <p className="text-gray-500">Liste des propriétés à implémenter</p>
              </Card>
            </TabsContent>

            <TabsContent value="payments">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Historique des Paiements</h3>
                <p className="text-gray-500">Historique des paiements à implémenter</p>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Centre de Messages</h3>
                <p className="text-gray-500">Messagerie à implémenter</p>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;