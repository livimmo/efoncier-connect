import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Tableau de Bord Administrateur</h1>
        <Card className="p-6">
          <p>Contenu du tableau de bord administrateur à implémenter</p>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;