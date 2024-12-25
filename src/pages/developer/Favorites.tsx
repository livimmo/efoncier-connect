import { useState } from "react";
import { Header } from "@/components/Header";
import { DeveloperPropertiesView } from "@/components/developer/properties/DeveloperPropertiesView";
import { useToast } from "@/hooks/use-toast";
import { mockParcels } from "@/utils/mockData/parcels";

const Favorites = () => {
  const [viewMode, setViewMode] = useState<"map" | "table">("table");
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Export en cours",
      description: "Le fichier sera bientôt disponible au téléchargement",
    });
  };

  // Filter only favorite parcels (in a real app, this would come from the backend)
  const favoriteParcels = mockParcels.filter(parcel => parcel.isFavorite);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-6 space-y-6 pt-24">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">⭐ Mes Biens Favoris</h1>
            <p className="text-muted-foreground mt-2">
              Retrouvez ici vos biens fonciers favoris pour un accès rapide et simplifié.
            </p>
          </div>
          <button
            onClick={handleExport}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            📥 Exporter la Liste
          </button>
        </div>
        <DeveloperPropertiesView 
          viewMode={viewMode} 
          onViewModeChange={setViewMode}
          data={favoriteParcels}
        />
      </main>
    </div>
  );
};

export default Favorites;