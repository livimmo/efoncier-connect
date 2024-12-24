import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyDetails } from "./PropertyDetails";
import { PropertyMap } from "./PropertyMap";
import { PropertyGallery } from "./PropertyGallery";
import { PropertyDocuments } from "./PropertyDocuments";
import { PropertyActions } from "./PropertyActions";
import { Badge } from "@/components/ui/badge";
import { Parcel } from "@/utils/mockData/types";
import { cn } from "@/lib/utils";

interface PropertyPopupProps {
  parcel: Parcel;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PropertyPopup({ parcel, open, onOpenChange }: PropertyPopupProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      AVAILABLE: { label: "Disponible", class: "bg-green-500/10 text-green-500" },
      UNAVAILABLE: { label: "Indisponible", class: "bg-red-500/10 text-red-500" },
      IN_TRANSACTION: { label: "En Transaction", class: "bg-orange-500/10 text-orange-500" },
    } as const;

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.UNAVAILABLE;
    return <Badge variant="secondary" className={config.class}>{config.label}</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            <DialogTitle>{parcel.title}</DialogTitle>
            {getStatusBadge(parcel.status || "AVAILABLE")}
          </div>
        </DialogHeader>

        <Tabs defaultValue="details" className="flex-1 overflow-hidden">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="details">📊 Détails</TabsTrigger>
            <TabsTrigger value="map">🗺️ Carte</TabsTrigger>
            <TabsTrigger value="gallery">📸 Photos</TabsTrigger>
            <TabsTrigger value="documents">📁 Documents</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto mt-4">
            <TabsContent value="details" className="m-0">
              <PropertyDetails parcel={parcel} />
            </TabsContent>

            <TabsContent value="map" className="m-0">
              <PropertyMap parcel={parcel} />
            </TabsContent>

            <TabsContent value="gallery" className="m-0">
              <PropertyGallery parcel={parcel} />
            </TabsContent>

            <TabsContent value="documents" className="m-0">
              <PropertyDocuments parcel={parcel} />
            </TabsContent>
          </div>
        </Tabs>

        <PropertyActions parcel={parcel} className="flex-shrink-0 mt-4" />
      </DialogContent>
    </Dialog>
  );
}