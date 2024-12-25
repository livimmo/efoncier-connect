import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Property } from "@/types";

interface PropertyDocumentsDialogProps {
  property: Property;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PropertyDocumentsDialog({ property, open, onOpenChange }: PropertyDocumentsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Documents du bien</DialogTitle>
          <DialogDescription>
            Liste des documents associés au bien
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <p>Documents en cours de chargement...</p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}