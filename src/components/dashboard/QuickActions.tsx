import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreditCard, FileText, MapPin, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PaymentDialog } from "../map/parcel-info/dialogs/PaymentDialog";
import { MessagesContainer } from "../messages/MessagesContainer";
import { useToast } from "@/hooks/use-toast";

export const QuickActions = () => {
  const navigate = useNavigate();
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const { toast } = useToast();

  const handleReportAction = (type: string, action: 'download' | 'print') => {
    setReportsOpen(false);

    if (action === 'download') {
      // Simuler le téléchargement
      toast({
        title: "Téléchargement du rapport",
        description: `Le rapport ${type} a été téléchargé au format PDF.`
      });
    } else {
      // Ouvrir la fenêtre d'impression
      window.print();
    }

    // Naviguer vers la page des rapports après l'action
    navigate(`/dashboard?tab=reports&type=${type}`);
  };

  return (
    <>
      {/* Dialogue de Messages */}
      <Dialog open={messagesOpen} onOpenChange={setMessagesOpen}>
        <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Messages</DialogTitle>
          </DialogHeader>
          <MessagesContainer />
        </DialogContent>
      </Dialog>

      {/* Dialogue de Paiement */}
      <PaymentDialog 
        open={paymentOpen} 
        onOpenChange={setPaymentOpen}
        parcelId="default"
      />

      {/* Dialogue de Rapports */}
      <Dialog open={reportsOpen} onOpenChange={setReportsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Rapports</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              <h4 className="font-medium">Rapports Disponibles</h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="justify-start w-full"
                    onClick={() => handleReportAction('payment', 'download')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Rapport des Paiements
                  </Button>
                  <div className="flex gap-2 pl-6">
                    <Button size="sm" variant="ghost" onClick={() => handleReportAction('payment', 'download')}>
                      Télécharger PDF
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleReportAction('payment', 'print')}>
                      Imprimer
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    variant="outline"
                    className="justify-start w-full"
                    onClick={() => handleReportAction('property', 'download')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Rapport des Biens
                  </Button>
                  <div className="flex gap-2 pl-6">
                    <Button size="sm" variant="ghost" onClick={() => handleReportAction('property', 'download')}>
                      Télécharger PDF
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleReportAction('property', 'print')}>
                      Imprimer
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    variant="outline"
                    className="justify-start w-full"
                    onClick={() => handleReportAction('activity', 'download')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Rapport d'Activité
                  </Button>
                  <div className="flex gap-2 pl-6">
                    <Button size="sm" variant="ghost" onClick={() => handleReportAction('activity', 'download')}>
                      Télécharger PDF
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleReportAction('activity', 'print')}>
                      Imprimer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Actions Rapides</h3>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => navigate("/owner/properties")}
          >
            <MapPin className="h-5 w-5" />
            <span>Carte Interactive</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => setPaymentOpen(true)}
          >
            <CreditCard className="h-5 w-5" />
            <span>Payer une Taxe</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => setMessagesOpen(true)}
          >
            <MessageSquare className="h-5 w-5" />
            <span>Messages</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => setReportsOpen(true)}
          >
            <FileText className="h-5 w-5" />
            <span>Rapports</span>
          </Button>
        </div>
      </Card>
    </>
  );
};