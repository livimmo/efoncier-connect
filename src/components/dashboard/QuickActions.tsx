import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreditCard, FileText, MapPin, MessageSquare, Download, Printer } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PaymentDialog } from "../map/parcel-info/dialogs/PaymentDialog";
import { MessagesContainer } from "../messages/MessagesContainer";
import { useToast } from "@/hooks/use-toast";
import { ReceiptPreview } from "../receipt/ReceiptPreview";

export const QuickActions = () => {
  const navigate = useNavigate();
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const { toast } = useToast();

  const handleReportAction = (type: string, action: 'download' | 'print') => {
    if (action === 'download') {
      toast({
        title: "Téléchargement du rapport",
        description: `Le rapport ${type} a été téléchargé au format PDF.`
      });
    } else {
      window.print();
    }
  };

  const getReportData = (type: string) => {
    // Exemple de données pour chaque type de rapport
    switch (type) {
      case 'payment':
        return {
          referenceNumber: "PAY-2024-001",
          date: new Date().toISOString(),
          taxpayer: {
            name: "John Doe",
            fiscalId: "FIS123456"
          },
          parcel: {
            id: "PARC-001",
            location: "123 Rue Example",
            area: 500,
            amount: 1500,
            transactionRef: "TXN-123456"
          }
        };
      case 'property':
        return {
          referenceNumber: "PROP-2024-001",
          date: new Date().toISOString(),
          taxpayer: {
            name: "John Doe",
            fiscalId: "FIS123456"
          },
          parcel: {
            id: "PARC-002",
            location: "456 Avenue Example",
            area: 750,
            amount: 2000,
            transactionRef: "TXN-789012"
          }
        };
      case 'activity':
        return {
          referenceNumber: "ACT-2024-001",
          date: new Date().toISOString(),
          taxpayer: {
            name: "John Doe",
            fiscalId: "FIS123456"
          },
          parcel: {
            id: "PARC-003",
            location: "789 Boulevard Example",
            area: 1000,
            amount: 2500,
            transactionRef: "TXN-345678"
          }
        };
      default:
        return null;
    }
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
                <Button 
                  variant="outline" 
                  className="justify-start w-full"
                  onClick={() => setSelectedReport('payment')}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Rapport des Paiements
                </Button>

                <Button 
                  variant="outline"
                  className="justify-start w-full"
                  onClick={() => setSelectedReport('property')}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Rapport des Biens
                </Button>

                <Button 
                  variant="outline"
                  className="justify-start w-full"
                  onClick={() => setSelectedReport('activity')}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Rapport d'Activité
                </Button>
              </div>
            </div>

            {selectedReport && (
              <div className="border-t pt-4">
                <div className="flex justify-end gap-2 mb-4">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleReportAction(selectedReport, 'download')}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleReportAction(selectedReport, 'print')}
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimer
                  </Button>
                </div>
                <ReceiptPreview 
                  data={getReportData(selectedReport)!}
                  onClose={() => setSelectedReport(null)}
                />
              </div>
            )}
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