import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Download, Trash2 } from "lucide-react";
import { Parcel } from "@/utils/mockData/types";
import { useAuth } from "@/components/auth/AuthProvider";

interface PropertyDocumentsProps {
  parcel: Parcel;
}

export function PropertyDocuments({ parcel }: PropertyDocumentsProps) {
  const { profile } = useAuth();
  const isAdmin = profile?.role === 'admin';

  const documents = [
    { name: "Note de Renseignement", type: "PDF" },
    { name: "Plan Cadastral", type: "PDF" },
    { name: "Certificat de Propriété", type: "PDF" },
  ];

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
        {documents.map((doc, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-sm text-muted-foreground">{doc.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              {isAdmin && (
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}