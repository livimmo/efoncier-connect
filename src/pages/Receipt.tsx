import { Header } from "@/components/Header";
import { ReceiptDetails } from "@/components/receipt/ReceiptDetails";
import { ReceiptActions } from "@/components/receipt/ReceiptActions";
import { ReceiptPreview } from "@/components/receipt/ReceiptPreview";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const Receipt = () => {
  const { id } = useParams();
  
  // Mock data - à remplacer par les vraies données
  const receiptData = {
    referenceNumber: "TNBPAY2024-12345",
    date: "2024-06-15T14:30:00",
    status: "confirmed",
    taxpayer: {
      name: "Ahmed El Fassi",
      fiscalId: "C12345",
      email: "ahmed.elfassi@email.com",
      phone: "+212 6 12 34 56 78"
    },
    parcel: {
      id: "TF#123456",
      location: "Casablanca, Maarif",
      area: 3500,
      amount: 25000,
      paymentMethod: "Carte Bancaire",
      dueDate: "2024-06-30",
      transactionRef: "TX123456789"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Message de confirmation */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">
            Votre paiement a été effectué avec succès !
          </h1>
          <p className="text-muted-foreground">
            Référence : {receiptData.referenceNumber}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <ReceiptDetails data={receiptData} />
            <ReceiptActions data={receiptData} />
          </div>
          <ReceiptPreview data={receiptData} />
        </div>
      </main>
    </div>
  );
};

export default Receipt;