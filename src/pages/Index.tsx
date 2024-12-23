import { Header } from "@/components/Header";
import Map from "@/components/Map";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 h-[calc(100vh-4rem)]">
        <Map />
      </main>
    </div>
  );
};

export default Index;