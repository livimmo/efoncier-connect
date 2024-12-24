import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PropertyPreviewProps {
  data: any;
  image: string | null;
  onClose: () => void;
}

export function PropertyPreview({ data, image, onClose }: PropertyPreviewProps) {
  const formatStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      AVAILABLE: "Disponible",
      DISPUTED: "En Litige",
      UNAVAILABLE: "Indisponible",
      IN_TRANSACTION: "En Transaction",
      PAID: "Payé",
      UNPAID: "Impayé",
      PARTIALLY_PAID: "Partiellement Payé",
    };
    return statusMap[status] || status;
  };

  const formatType = (type: string) => {
    const typeMap: Record<string, string> = {
      RESIDENTIAL: "Résidentiel",
      COMMERCIAL: "Commercial",
      INDUSTRIAL: "Industriel",
      AGRICULTURAL: "Agricole",
      SEASIDE: "Balnéaire",
    };
    return typeMap[type] || type;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Prévisualisation du Bien</DialogTitle>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fermer</span>
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="space-y-6">
          {image && (
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <img
                src={image}
                alt="Aperçu du bien"
                className="object-cover w-full h-full"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">
                Numéro de Titre Foncier
              </h4>
              <p>{data.titleDeedNumber}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">
                Type de Terrain
              </h4>
              <p>{formatType(data.type)}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">
                Localisation
              </h4>
              <p>
                {data.street}, {data.district}, {data.city}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">
                Superficie
              </h4>
              <p>{data.surface} m²</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">
                Prix TNB
              </h4>
              <p>{data.tnbPrice} DHS/m²</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">
                Statut
              </h4>
              <p>{formatStatus(data.status)}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">
                Statut Fiscal
              </h4>
              <p>{formatStatus(data.fiscalStatus)}</p>
            </div>
            {data.bank && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">
                  Banque
                </h4>
                <p>{data.bank}</p>
              </div>
            )}
          </div>

          {(data.ownerName || data.ownerEmail || data.ownerPhone) && (
            <div>
              <h3 className="font-semibold mb-2">Coordonnées du Propriétaire</h3>
              <div className="grid grid-cols-2 gap-4">
                {data.ownerName && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">
                      Nom
                    </h4>
                    <p>{data.ownerName}</p>
                  </div>
                )}
                {data.ownerEmail && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">
                      Email
                    </h4>
                    <p>{data.ownerEmail}</p>
                  </div>
                )}
                {data.ownerPhone && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">
                      Téléphone
                    </h4>
                    <p>{data.ownerPhone}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {data.description && (
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">
                Description
              </h4>
              <p className="mt-1">{data.description}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}