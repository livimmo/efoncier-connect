import { Suspense, lazy } from "react";
import { Header } from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";

// Chargement paresseux des composants lourds
const Map = lazy(() => import("@/components/Map"));

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Bienvenue sur eFoncier</h1>
        <Suspense 
          fallback={
            <div className="w-full h-[500px] rounded-lg">
              <Skeleton className="w-full h-full" />
            </div>
          }
        >
          <Map />
        </Suspense>
      </main>
    </div>
  );
};

export default Home;