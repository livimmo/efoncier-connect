import { Dialog } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Property } from "@/types";
import { useState } from "react";

interface PropertyLocationDialogProps {
  property: Property;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PropertyLocationDialog({ property, open, onOpenChange }: PropertyLocationDialogProps) {
  const [propertyType, setPropertyType] = useState(property.property_type);
  const [tnbStatus, setTnbStatus] = useState(property.tnbInfo?.status || "LOW");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Localisation du bien</Dialog.Title>
          <Dialog.Description>
            Détails de localisation et informations sur le bien
          </Dialog.Description>
        </Dialog.Header>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label>Type de bien</label>
            <Select 
              value={propertyType} 
              onValueChange={(value: string) => setPropertyType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RESIDENTIAL">Résidentiel</SelectItem>
                <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                <SelectItem value="INDUSTRIAL">Industriel</SelectItem>
                <SelectItem value="AGRICULTURAL">Agricole</SelectItem>
                <SelectItem value="MIXED">Mixte</SelectItem>
                <SelectItem value="SEASIDE">Bord de mer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <label>Statut TNB</label>
            <Select 
              value={tnbStatus} 
              onValueChange={(value: string) => setTnbStatus(value as "PAID" | "LOW" | "AVERAGE" | "HIGH")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PAID">Payé</SelectItem>
                <SelectItem value="LOW">Bas</SelectItem>
                <SelectItem value="AVERAGE">Moyen</SelectItem>
                <SelectItem value="HIGH">Élevé</SelectItem>
              </SelectContent>
            </Select>
          </div>
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