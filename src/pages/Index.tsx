import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <main className="pt-16 pl-64">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Bienvenue sur eFoncier
          </h1>
          <p className="text-gray-600">
            Plateforme de gestion foncière du gouvernement marocain
          </p>
          
          {/* Placeholder for the map and other dashboard content */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Carte Interactive</h2>
              <div className="aspect-video bg-gray-100 rounded"></div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Résumé Fiscal</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Montant dû</span>
                  <span className="font-medium">15,000 MAD</span>
                </div>
                <div className="flex justify-between">
                  <span>Échéance</span>
                  <span className="font-medium">30 Juin 2024</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Notifications Récentes</h2>
              <div className="space-y-2">
                <div className="p-2 bg-primary/10 rounded">
                  <p className="text-sm">Nouveau paiement reçu</p>
                  <p className="text-xs text-gray-500">Il y a 2 heures</p>
                </div>
                <div className="p-2 bg-secondary/10 rounded">
                  <p className="text-sm">Mise à jour de la carte cadastrale</p>
                  <p className="text-xs text-gray-500">Il y a 1 jour</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;