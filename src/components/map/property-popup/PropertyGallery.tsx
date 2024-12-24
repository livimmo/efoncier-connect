import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { PropertyImageUpload } from "./PropertyImageUpload";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Parcel } from "@/utils/mockData/types";

interface PropertyGalleryProps {
  parcel: Parcel;
}

interface PropertyImage {
  id: string;
  file_path: string;
  created_at: string;
}

export function PropertyGallery({ parcel }: PropertyGalleryProps) {
  const { profile } = useAuth();
  const isOwner = profile?.id === parcel.owner;
  const [images, setImages] = useState<PropertyImage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('property_images')
        .select('*')
        .eq('property_id', parcel.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [parcel.id]);

  const getImageUrl = (filePath: string) => {
    return supabase.storage
      .from('property_images')
      .getPublicUrl(filePath)
      .data.publicUrl;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Photos du Bien</h3>
        {isOwner && (
          <PropertyImageUpload 
            propertyId={parcel.id} 
            onSuccess={fetchImages}
          />
        )}
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div 
              key={image.id}
              className="aspect-square relative overflow-hidden rounded-lg bg-muted"
            >
              <img
                src={getImageUrl(image.file_path)}
                alt="Property"
                className="object-cover w-full h-full hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Aucune photo disponible</p>
        </div>
      )}
    </Card>
  );
}