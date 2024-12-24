import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DocumentListItem } from "./DocumentListItem";
import type { PropertyDocument, PropertyDocumentsProps } from "./types";

export function PropertyDocuments({ parcel }: PropertyDocumentsProps) {
  const { profile } = useAuth();
  const isOwner = profile?.id === parcel.owner;
  const { toast } = useToast();
  const [documents, setDocuments] = useState<PropertyDocument[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, [parcel.id]);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('property_documents')
        .select('*')
        .eq('property_id', parcel.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les documents",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type (PDF only)
    if (file.type !== 'application/pdf') {
      toast({
        title: "Type de fichier non supporté",
        description: "Veuillez sélectionner un fichier PDF",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: "La taille maximale est de 10MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${parcel.id}/${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('property_documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('property_documents')
        .insert({
          property_id: parcel.id,
          name: file.name,
          file_path: filePath,
          document_type: 'PDF'
        });

      if (dbError) throw dbError;

      toast({
        title: "Document téléchargé",
        description: "Le document a été ajouté avec succès"
      });

      fetchDocuments();

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Erreur lors du téléchargement",
        description: "Veuillez réessayer plus tard",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Documents</h3>
        {isOwner && (
          <div>
            <input
              type="file"
              id="document-upload"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <Button
              variant="outline"
              size="sm"
              disabled={isUploading}
              onClick={() => document.getElementById('document-upload')?.click()}
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              Ajouter un document
            </Button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : documents.length > 0 ? (
        <div className="space-y-4">
          {documents.map((doc) => (
            <DocumentListItem key={doc.id} doc={doc} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>Aucun document disponible</p>
        </div>
      )}
    </Card>
  );
}