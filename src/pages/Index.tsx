import { Header } from "@/components/Header";
import Map from "@/components/Map";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="h-[calc(100vh-4rem)] pt-16">
        <Map />
      </main>
    </div>
  );
};

export default Index;