import { Button } from "@/components/ui/button";
import { PenSquare, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const MessagesHeader = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleNewMessage = () => {
    toast({
      title: "Nouveau message",
      description: "Création d'un nouveau message...",
    });
    navigate("/messages/new");
  };

  const handleExport = () => {
    toast({
      title: "Export en cours",
      description: "Vos conversations seront bientôt disponibles au téléchargement.",
    });
    // Logique d'export à implémenter
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
        <Button onClick={handleNewMessage} className="bg-primary hover:bg-primary/90">
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