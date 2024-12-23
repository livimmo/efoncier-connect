import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Map } from "@/components/Map";

const Search = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-4">
          <Card className="p-4">
            <h1 className="text-2xl font-bold mb-4">Recherche de Terrains</h1>
            <div className="h-[600px]">
              <Map />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Search;