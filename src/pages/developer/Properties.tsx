import { useState } from "react";
import { Header } from "@/components/Header";
import { DeveloperPropertiesHeader } from "@/components/developer/properties/DeveloperPropertiesHeader";
import { DeveloperPropertiesView } from "@/components/developer/properties/DeveloperPropertiesView";
import { Property } from "@/types";
import { useToast } from "@/hooks/use-toast";

const DeveloperProperties = () => {
  const [viewMode, setViewMode] = useState<"map" | "table">("table");
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Export en cours",
      description: "Le fichier sera bientôt disponible au téléchargement",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-6 space-y-6 pt-24">
        <DeveloperPropertiesHeader onExport={handleExport} />
        <DeveloperPropertiesView viewMode={viewMode} onViewModeChange={setViewMode} />
      </main>
    </div>
  );
};

export default DeveloperProperties;