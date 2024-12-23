import { Header } from "@/components/Header";
import Map from "@/components/Map";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="h-[calc(100vh-4rem)] pt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-primary">Carte Interactive des Terrains</h1>
            <p className="text-muted-foreground mt-2">
              Explorez et analysez les terrains disponibles avec des informations détaillées en temps réel.
            </p>
          </div>
        </div>
        <Map />
      </main>
    </div>
  );
}