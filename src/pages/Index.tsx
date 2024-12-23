import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Map } from "@/components/Map";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <main className="pt-16 pl-64 transition-all duration-300">
        <Map />
      </main>
    </div>
  );
};

export default Index;