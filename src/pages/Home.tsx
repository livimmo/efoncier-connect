import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 mt-16">
          <h1 className="text-2xl font-bold mb-4">Bienvenue sur eFoncier</h1>
          <p>Plateforme de gestion des taxes foncières au Maroc</p>
        </main>
      </div>
    </div>
  );
};

export default Home;