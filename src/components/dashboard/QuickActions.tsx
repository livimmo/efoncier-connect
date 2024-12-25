import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreditCard, FileText, MapPin, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PaymentDialog } from "../map/parcel-info/dialogs/PaymentDialog";
import { MessagesContainer } from "../messages/MessagesContainer";
import { ReportsList } from "../reports/ReportsList";
import { ReportActions } from "../reports/ReportActions";
import { ReceiptPreview } from "../receipt/ReceiptPreview";
import { getReportData } from "@/utils/mockData/reports";
import { ReportType } from "@/types/reports";

export const QuickActions = () => {
  const navigate = useNavigate();
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);

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
            <ReportsList onSelectReport={setSelectedReport} />

            {selectedReport && (
              <div className="border-t pt-4">
                <ReportActions reportType={selectedReport} />
                <ReceiptPreview 
                  data={getReportData(selectedReport)}
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