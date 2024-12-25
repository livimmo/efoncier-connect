import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleDeedNumber?: string;
  amount?: number;
}

export const PaymentDialog = ({ open, onOpenChange, titleDeedNumber, amount }: PaymentDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Paiement TNB</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Vous allez procéder au paiement de la TNB pour le bien {titleDeedNumber}.</p>
          {amount && (
            <p className="font-semibold">Montant à payer : {amount.toLocaleString()} DH</p>
          )}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button onClick={() => navigate(`/payment?tf=${titleDeedNumber}`)}>
              Procéder au paiement
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};