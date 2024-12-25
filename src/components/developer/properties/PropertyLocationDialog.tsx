import { useEffect, useState } from "react";
import { Property } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PropertyLocationDialogProps {
  property: Property;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PropertyLocationDialog = ({ property, open, onOpenChange }: PropertyLocationDialogProps) => {
  const [location, setLocation] = useState(property.location);
  const [propertyType, setPropertyType] = useState(property.property_type);
  const [tnbStatus, setTnbStatus] = useState(property.tnbInfo?.status || "LOW");

  const handleSave = () => {
    // Save logic here
    onOpenChange(false);
  };

  useEffect(() => {
    setLocation(property.location);
    setPropertyType(property.property_type);
    setTnbStatus(property.tnbInfo?.status || "LOW");
  }, [property]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Modifier la localisation</DialogTitle>
        <DialogDescription>
          <div className="space-y-4">
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Localisation"
            />
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Type de propriété" />
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
            <Select value={tnbStatus} onValueChange={setTnbStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Statut TNB" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PAID">Payé</SelectItem>
                <SelectItem value="LOW">Bas</SelectItem>
                <SelectItem value="AVERAGE">Moyen</SelectItem>
                <SelectItem value="HIGH">Élevé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="outline">Annuler</Button>
          <Button onClick={handleSave}>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyLocationDialog;