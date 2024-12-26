import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { File, Printer, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parcelId: string;
}

export const DocumentsDialog = ({ open, onOpenChange, parcelId }: DocumentsDialogProps) => {
  const { toast } = useToast();

  const handlePrint = () => {
    window.print();
    toast({
      title: "Impression lancée",
      description: "Le document est en cours d'impression",
    });
  };

  const handleDownload = (documentType: string) => {
    toast({
      title: "Téléchargement démarré",
      description: `Le ${documentType} sera bientôt disponible`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <File className="h-5 w-5" />
            Documents Disponibles
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="note" className="flex-1">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="note">Note de Renseignement</TabsTrigger>
            <TabsTrigger value="cadastral">Plan Cadastral</TabsTrigger>
            <TabsTrigger value="contenance">Plan de Contenance</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 p-4">
            {["note", "cadastral", "contenance"].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-4">
                <div className="aspect-[1/1.4] bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-muted-foreground text-center p-4">
                    <File className="h-12 w-12 mx-auto mb-2" />
                    <p>Aperçu du document</p>
                    <p className="text-sm">
                      {tab === "note" && "Note de Renseignement"}
                      {tab === "cadastral" && "Plan Cadastral"}
                      {tab === "contenance" && "Plan de Contenance"}
                    </p>
                  </div>
                </div>
              </TabsContent>
            ))}
          </ScrollArea>

          <div className="flex justify-end gap-2 p-4 border-t">
            <Button
              variant="outline"
              onClick={() => handleDownload("document")}
            >
              <Download className="h-4 w-4 mr-2" />
              Télécharger
            </Button>
            <Button
              variant="default"
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4 mr-2" />
              Imprimer
            </Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};