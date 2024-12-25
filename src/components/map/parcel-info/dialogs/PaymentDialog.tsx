import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Building2, Wallet } from "lucide-react";
import { CardPaymentForm } from "@/components/payment/CardPaymentForm";
import { BankTransferInfo } from "@/components/payment/BankTransferInfo";
import { MobilePayment } from "@/components/payment/MobilePayment";

interface PaymentDialogProps {
  parcelId: string;
  hideHeader?: boolean;
  onClose?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const PaymentDialog = ({ 
  parcelId, 
  hideHeader, 
  onClose,
  open,
  onOpenChange 
}: PaymentDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange || onClose}>
      <DialogContent className="max-w-3xl">
        {!hideHeader && (
          <DialogHeader>
            <DialogTitle>Paiement de la TNB</DialogTitle>
          </DialogHeader>
        )}

        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="card" className="space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>Carte Bancaire</span>
            </TabsTrigger>
            <TabsTrigger value="bank" className="space-x-2">
              <Building2 className="h-4 w-4" />
              <span>Virement Bancaire</span>
            </TabsTrigger>
            <TabsTrigger value="mobile" className="space-x-2">
              <Wallet className="h-4 w-4" />
              <span>Paiement Mobile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="card">
            <CardPaymentForm amount={5000} loading={false} onSubmit={() => {}} />
          </TabsContent>

          <TabsContent value="bank">
            <BankTransferInfo referenceId={parcelId} />
          </TabsContent>

          <TabsContent value="mobile">
            <MobilePayment />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};