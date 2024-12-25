import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Property } from "@/types";
import { useState } from "react";

interface PropertyDocumentsDialogProps {
  property: Property;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PropertyDocumentsDialog({ property, open, onOpenChange }: PropertyDocumentsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Documents du bien</Dialog.Title>
          <Dialog.Description>
            Liste des documents associés au bien
          </Dialog.Description>
        </Dialog.Header>

        <div className="grid gap-4 py-4">
          <p>Documents en cours de chargement...</p>
        </div>

        <Dialog.Footer>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}