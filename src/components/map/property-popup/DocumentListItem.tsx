import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyDocument } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DocumentListItemProps {
  doc: PropertyDocument;
}

export function DocumentListItem({ doc }: DocumentListItemProps) {
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('property_documents')
        .download(doc.file_path);

      if (error) throw error;

      // Create a download link
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Erreur lors du téléchargement",
        description: "Impossible de télécharger le document",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
      <div className="flex items-center gap-3">
        <FileText className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="font-medium">{doc.name}</p>
          <p className="text-sm text-muted-foreground">PDF</p>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handleDownload}
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
}