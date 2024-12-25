import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Property } from "@/types";
import { convertFiscalStatus } from "@/utils/conversions";

interface PropertyDocumentsDialogProps {
  property: Property;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PropertyDocumentsDialog = ({ property, open, onOpenChange }: PropertyDocumentsDialogProps) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      // Logic to download property documents
    } catch (error) {
      console.error("Error downloading documents:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay />
      <DialogContent>
        <DialogTitle>Documents pour {property.title}</DialogTitle>
        <DialogDescription>
          Statut fiscal: {convertFiscalStatus(property.fiscal_status)}
        </DialogDescription>
        <div className="mt-4">
          <Button onClick={handleDownload} disabled={loading}>
            {loading ? "Téléchargement..." : "Télécharger les documents"}
          </Button>
        </div>
        <Button variant="outline" onClick={() => onOpenChange(false)} className="mt-4">
          Fermer
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDocumentsDialog;