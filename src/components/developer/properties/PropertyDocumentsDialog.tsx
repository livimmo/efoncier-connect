import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Property } from "@/types";

interface PropertyDocumentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: Property;
}

const PropertyDocumentsDialog = ({ open, onOpenChange, property }: PropertyDocumentsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Documents - {property.title}</DialogTitle>
          <DialogDescription>
            Consultez les documents associés à cette propriété
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {/* Document list will go here */}
          <p className="text-muted-foreground">Aucun document disponible</p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDocumentsDialog;