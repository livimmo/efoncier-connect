import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Download, Eye, ArrowRight } from "lucide-react";

export const DocumentsList = () => {
  const documents = [
    { name: "Plan Cadastral", type: "PDF", id: "doc1" },
    { name: "Note de Renseignement", type: "PDF", id: "doc2" },
    { name: "Certificat de Propriété", type: "PDF", id: "doc3" },
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Documents</h3>
        <Button variant="ghost" size="sm" className="gap-2">
          Voir Tous
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[200px]">
        <div className="space-y-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.type}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};