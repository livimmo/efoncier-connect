import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="p-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Recherche de Parcelles</h1>
          
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher une parcelle par numéro, adresse ou propriétaire..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            
            <Button type="submit" className="w-full">
              Rechercher
            </Button>
          </form>

          <div className="mt-8">
            <p className="text-muted-foreground text-center">
              Aucun résultat pour le moment. Commencez votre recherche !
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;