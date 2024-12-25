import { useEffect, useState } from "react";
import { Property } from "@/types";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { PropertyType, TNBStatus } from "@/utils/mockData/types";

interface PropertyLocationDialogProps {
  property: Property;
  onClose: () => void;
}

const PropertyLocationDialog = ({ property, onClose }: PropertyLocationDialogProps) => {
  const [location, setLocation] = useState(property.location);
  const [propertyType, setPropertyType] = useState(convertPropertyType(property.property_type));
  const [tnbStatus, setTnbStatus] = useState(convertTNBStatus(property.tnbInfo.status));

  const handleSave = () => {
    // Save logic here
    onClose();
  };

  const convertPropertyType = (type: string): PropertyType => {
    return type.toUpperCase() as PropertyType;
  };

  const convertTNBStatus = (status: string): TNBStatus => {
    switch (status) {
      case "PAID":
        return "PAID";
      case "LOW":
        return "LOW";
      case "AVERAGE":
        return "AVERAGE";
      case "HIGH":
        return "HIGH";
      default:
        return "LOW";
    }
  };

  useEffect(() => {
    setLocation(property.location);
    setPropertyType(convertPropertyType(property.property_type));
    setTnbStatus(convertTNBStatus(property.tnbInfo.status));
  }, [property]);

  return (
    <Dialog open onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Title>Modifier la localisation</Dialog.Title>
        <Dialog.Description>
          <div>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Localisation"
            />
            <Select value={propertyType} onValueChange={setPropertyType}>
              <Select.Trigger>
                <Select.Value placeholder="Type de propriété" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="RESIDENTIAL">Résidentiel</Select.Item>
                <Select.Item value="COMMERCIAL">Commercial</Select.Item>
                <Select.Item value="INDUSTRIAL">Industriel</Select.Item>
                <Select.Item value="AGRICULTURAL">Agricole</Select.Item>
                <Select.Item value="MIXED">Mixte</Select.Item>
                <Select.Item value="SEASIDE">Bord de mer</Select.Item>
              </Select.Content>
            </Select>
            <Select value={tnbStatus} onValueChange={setTnbStatus}>
              <Select.Trigger>
                <Select.Value placeholder="Statut TNB" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="PAID">Payé</Select.Item>
                <Select.Item value="LOW">Bas</Select.Item>
                <Select.Item value="AVERAGE">Moyen</Select.Item>
                <Select.Item value="HIGH">Élevé</Select.Item>
              </Select.Content>
            </Select>
          </div>
        </Dialog.Description>
        <Dialog.Actions>
          <Button onClick={onClose}>Annuler</Button>
          <Button onClick={handleSave}>Enregistrer</Button>
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog>
  );
};

export default PropertyLocationDialog;
