import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Map } from "@/components/Map";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64">
          <div className="h-[calc(100vh-4rem)] mt-16">
            <Map />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;