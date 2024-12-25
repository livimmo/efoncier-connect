import { Header } from "@/components/Header";
import { DeveloperFavoritesHeader } from "@/components/developer/favorites/DeveloperFavoritesHeader";
import { DeveloperFavoritesView } from "@/components/developer/favorites/DeveloperFavoritesView";
import { useState } from "react";

const DeveloperFavorites = () => {
  const [viewMode, setViewMode] = useState<"map" | "table">("table");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-6 space-y-6 pt-24">
        <DeveloperFavoritesHeader />
        <DeveloperFavoritesView viewMode={viewMode} onViewModeChange={setViewMode} />
      </main>
    </div>
  );
};

export default DeveloperFavorites;