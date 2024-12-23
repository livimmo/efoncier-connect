import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Map } from "@/components/Map";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <main className="pt-16 pl-64">
        <div className="h-[calc(100vh-4rem)]">
          <Map />
        </div>
      </main>
    </div>
  );
};

export default Index;