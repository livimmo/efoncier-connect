import { Suspense, lazy } from "react";
import { Header } from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchBar } from "@/components/search/SearchBar";

const Map = lazy(() => import("@/components/Map").then(module => ({ 
  default: module.default 
})));

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Bienvenue sur eFoncier</h1>
        
        <div className="mb-8">
          <SearchBar />
        </div>

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