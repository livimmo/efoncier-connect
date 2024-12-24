import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PropertyImageUploadProps {
  propertyId: string;
  onSuccess?: () => void;
}

export function PropertyImageUpload({ propertyId, onSuccess }: PropertyImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Type de fichier non supporté",
        description: "Veuillez sélectionner une image",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: "La taille maximale est de 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${propertyId}/${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('property_images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save reference in the database
      const { error: dbError } = await supabase
        .from('property_images')
        .insert({
          property_id: propertyId,
          file_path: filePath
        });

      if (dbError) throw dbError;

      toast({
        title: "Image téléchargée",
        description: "L'image a été ajoutée avec succès"
      });

      if (onSuccess) onSuccess();

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
    <div>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <Button
        variant="outline"
        size="sm"
        disabled={isUploading}
        onClick={() => document.getElementById('image-upload')?.click()}
      >
        {isUploading ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <ImagePlus className="h-4 w-4 mr-2" />
        )}
        Ajouter une photo
      </Button>
    </div>
  );
}