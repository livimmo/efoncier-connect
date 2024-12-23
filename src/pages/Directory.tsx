import { useState } from "react";
import { Header } from "@/components/Header";
import { DirectorySearch } from "@/components/directory/DirectorySearch";
import { DirectoryTable } from "@/components/directory/DirectoryTable";
import { DirectoryFilters } from "@/components/directory/DirectoryFilters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Directory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    type: "all",
    status: "all",
    location: "all",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-6 pt-24 space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">
            Annuaire des Contribuables et Promoteurs
          </h1>
          <p className="text-muted-foreground">
            Recherchez et accédez facilement aux profils détaillés pour une
            meilleure gestion et collaboration.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recherche et Filtres</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <DirectorySearch 
              value={searchQuery} 
              onChange={setSearchQuery} 
            />
            <DirectoryFilters 
              filters={activeFilters} 
              onChange={setActiveFilters} 
            />
          </CardContent>
        </Card>

        <DirectoryTable 
          searchQuery={searchQuery}
          filters={activeFilters}
        />
      </main>
    </div>
  );
}