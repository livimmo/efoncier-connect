import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";

interface DocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleDeedNumber?: string;
  documentType?: string;
  documentUrl?: string;
}

export const DocumentDialog = ({ open, onOpenChange, titleDeedNumber, documentType, documentUrl }: DocumentDialogProps) => {
  const handleDownload = () => {
    if (documentUrl) {
      window.open(documentUrl, '_blank');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Document disponible</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Document {documentType} pour le bien {titleDeedNumber}</p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fermer
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Eye className="mr-2 h-4 w-4" />
              Aperçu
            </Button>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Télécharger
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};