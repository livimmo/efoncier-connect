import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', montant: 4000 },
  { name: 'Fév', montant: 3000 },
  { name: 'Mar', montant: 2000 },
  { name: 'Avr', montant: 2780 },
  { name: 'Mai', montant: 1890 },
  { name: 'Juin', montant: 2390 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <main className="pt-16 pl-64 transition-all duration-300">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Bienvenue sur eFoncier
          </h1>
          <p className="text-gray-600 mb-8">
            Plateforme de gestion foncière du gouvernement marocain
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Carte Interactive</h2>
              <div className="aspect-video bg-gray-100 rounded-lg"></div>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Résumé Fiscal</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Montant dû</span>
                  <span className="font-medium text-primary">15,000 MAD</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Échéance</span>
                  <span className="font-medium">30 Juin 2024</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Notifications Récentes</h2>
              <div className="space-y-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium">Nouveau paiement reçu</p>
                  <p className="text-xs text-gray-500">Il y a 2 heures</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <p className="text-sm font-medium">Mise à jour cadastrale</p>
                  <p className="text-xs text-gray-500">Il y a 1 jour</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="mt-6 p-6">
            <h2 className="text-lg font-semibold mb-4">Évolution des Paiements</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="montant" fill="#C1272D" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;