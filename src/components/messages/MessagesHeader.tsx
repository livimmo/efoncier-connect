import { Button } from "@/components/ui/button";
import { PenSquare, Download } from "lucide-react";

export const MessagesHeader = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Centre de Messagerie eFoncier</h1>
      <p className="text-muted-foreground mt-2">
        Communiquez directement avec les propriétaires et les promoteurs pour faciliter vos transactions.
      </p>
      <div className="flex gap-3 mt-4">
        <Button>
          <PenSquare className="w-4 h-4 mr-2" />
          Nouveau Message
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exporter les Conversations
        </Button>
      </div>
    </div>
  );
};