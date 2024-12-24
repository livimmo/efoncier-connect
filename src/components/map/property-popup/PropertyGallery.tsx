import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Parcel } from "@/utils/mockData/types";
import { useAuth } from "@/components/auth/AuthProvider";

interface PropertyGalleryProps {
  parcel: Parcel;
}

export function PropertyGallery({ parcel }: PropertyGalleryProps) {
  const { profile } = useAuth();
  const isAdmin = profile?.role === 'admin';

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Photos du Bien</h3>
        {isAdmin && (
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Ajouter une photo
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Aucune photo disponible</p>
        </div>
      </div>
    </Card>
  );
}