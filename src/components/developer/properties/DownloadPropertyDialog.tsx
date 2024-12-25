import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Parcel } from "@/types";
import { formatCurrency } from "@/utils/format";

interface DownloadPropertyDialogProps {
  parcel: Parcel | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DownloadPropertyDialog = ({
  parcel,
  open,
  onOpenChange,
}: DownloadPropertyDialogProps) => {
  const { toast } = useToast();

  if (!parcel) return null;

  const handleDownloadPDF = () => {
    toast({
      title: "Téléchargement démarré",
      description: "Le fichier PDF sera bientôt disponible",
    });
  };

  const handleDownloadExcel = () => {
    toast({
      title: "Téléchargement démarré",
      description: "Le fichier Excel sera bientôt disponible",
    });
  };

  const handlePreview = () => {
    toast({
      title: "Aperçu",
      description: "L'aperçu sera bientôt disponible",
    });
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return '🟢 Disponible';
      case 'IN_TRANSACTION':
        return '🟡 En Transaction';
      case 'SOLD':
        return '🔴 Vendu';
      default:
        return '⚪ Indéfini';
    }
  };

  const getTaxStatusDisplay = (status: string) => {
    return status === 'PAID' ? '✅ Payé' : '❌ Impayé';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Télécharger la Fiche du Bien
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Numéro TF</p>
              <p className="text-sm text-muted-foreground">{parcel.titleDeedNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Localisation</p>
              <p className="text-sm text-muted-foreground">{parcel.address}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Superficie</p>
              <p className="text-sm text-muted-foreground">{parcel.surface} m²</p>
            </div>
            <div>
              <p className="text-sm font-medium">Prix</p>
              <p className="text-sm text-muted-foreground">
                {formatCurrency(parcel.tnbInfo.pricePerMeter)} DHS/m²
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Statut</p>
              <p className="text-sm text-muted-foreground">
                {getStatusDisplay(parcel.status)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Statut Fiscal</p>
              <p className="text-sm text-muted-foreground">
                {getTaxStatusDisplay(parcel.taxStatus)}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              className="flex-1"
              onClick={handleDownloadPDF}
            >
              <Download className="mr-2 h-4 w-4" />
              Télécharger PDF
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleDownloadExcel}
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Télécharger Excel
            </Button>
            <Button 
              variant="secondary"
              className="flex-1"
              onClick={handlePreview}
            >
              <Eye className="mr-2 h-4 w-4" />
              Aperçu
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};