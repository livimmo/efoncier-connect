import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Map } from "@/components/Map";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pt-16">
          <Map />
        </main>
      </div>
    </div>
  );
};

export default Index;