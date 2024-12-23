import { Header } from "@/components/Header";
import { Map } from "@/components/Map";

const MapPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <Map />
      </main>
    </div>
  );
};

export default MapPage;