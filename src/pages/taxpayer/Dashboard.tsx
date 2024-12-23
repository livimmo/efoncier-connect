import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

const TaxpayerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 mt-16">
          <h1 className="text-2xl font-bold mb-4">Tableau de bord contribuable</h1>
          <p>Tableau de bord contribuable en construction...</p>
        </main>
      </div>
    </div>
  );
};

export default TaxpayerDashboard;