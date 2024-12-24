import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import type { Parcel } from "@/utils/mockData/types";
import { formatCurrency } from "@/utils/format";

interface TNBCalculatorProps {
  parcel: Parcel;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TNBCalculator = ({ parcel, open, onOpenChange }: TNBCalculatorProps) => {
  const [surface, setSurface] = useState(parcel.surface.toString());
  const [pricePerMeter, setPricePerMeter] = useState(parcel.tnbInfo.pricePerMeter.toString());

  const calculateTNB = () => {
    const calculatedAmount = Number(surface) * Number(pricePerMeter);
    return isNaN(calculatedAmount) ? 0 : calculatedAmount;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Calculateur TNB</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="surface">Surface (m²)</Label>
            <Input
              id="surface"
              type="number"
              value={surface}
              onChange={(e) => setSurface(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Prix TNB (DHS/m²)</Label>
            <Input
              id="price"
              type="number"
              value={pricePerMeter}
              onChange={(e) => setPricePerMeter(e.target.value)}
            />
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="text-sm font-medium">Montant TNB Annuel Estimé</div>
            <div className="text-2xl font-bold mt-1">
              {formatCurrency(calculateTNB())} DHS
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Fermer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};