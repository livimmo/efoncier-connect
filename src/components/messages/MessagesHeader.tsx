import { Button } from "@/components/ui/button";
import { PenSquare, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const MessagesHeader = () => {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Export en cours",
      description: "Vos conversations seront bientôt disponibles au téléchargement.",
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Centre de Messagerie eFoncier</h1>
        <p className="text-muted-foreground mt-2">
          Communiquez directement avec les propriétaires et les promoteurs pour faciliter vos transactions.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button className="bg-primary hover:bg-primary/90">
          <PenSquare className="w-4 h-4 mr-2" />
          Nouveau Message
        </Button>
        <Button variant="outline" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Exporter les Conversations
        </Button>
      </div>
    </div>
  );
};