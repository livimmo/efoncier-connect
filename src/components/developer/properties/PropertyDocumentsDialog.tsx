import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Property } from "@/types";
import { convertFiscalStatus } from "@/utils/conversions";

interface PropertyDocumentsDialogProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyDocumentsDialog = ({ property, isOpen, onClose }: PropertyDocumentsDialogProps) => {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay />
      <Dialog.Content>
        <Dialog.Title>Documents pour {property.title}</Dialog.Title>
        <Dialog.Description>
          Statut fiscal: {convertFiscalStatus(property.fiscal_status)}
        </Dialog.Description>
        <div className="mt-4">
          <Button onClick={handleDownload} disabled={loading}>
            {loading ? "Téléchargement..." : "Télécharger les documents"}
          </Button>
        </div>
        <Button variant="outline" onClick={onClose} className="mt-4">
          Fermer
        </Button>
      </Dialog.Content>
    </Dialog>
  );
};

export default PropertyDocumentsDialog;
