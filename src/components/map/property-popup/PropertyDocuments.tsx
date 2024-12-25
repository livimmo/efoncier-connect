import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Download, Eye } from "lucide-react";
import { Parcel } from "@/utils/mockData/types";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";

interface PropertyDocumentsProps {
  parcel: Parcel;
}

export function PropertyDocuments({ parcel }: PropertyDocumentsProps) {
  const { profile } = useAuth();
  const { toast } = useToast();
  const isAdmin = profile?.role === 'admin';

  const documents = [
    { 
      name: "Note de Renseignement", 
      type: "PDF",
      id: "note-renseignement"
    },
    { 
      name: "Plan Cadastral", 
      type: "PDF",
      id: "plan-cadastral"
    },
    { 
      name: "Certificat de Propriété", 
      type: "PDF",
      id: "certificat-propriete"
    },
  ];

  const handleDownload = (documentId: string) => {
    toast({
      title: "Téléchargement démarré",
      description: "Le document sera bientôt disponible",
    });
  };

  const handlePreview = (documentId: string) => {
    toast({
      title: "Aperçu du document",
      description: "Ouverture de l'aperçu en cours...",
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Documents</h3>
        {isAdmin && (
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Ajouter un document
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-sm text-muted-foreground">{doc.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handlePreview(doc.id)}
              >
                <Eye className="h-4 w-4 mr-2" />
                Aperçu
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDownload(doc.id)}
              >
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}