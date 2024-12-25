import { Button } from "@/components/ui/button";
import { RefreshCw, Download, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PaymentHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">💳 Effectuer un Paiement</h1>
        <p className="text-muted-foreground">
          Réglez vos taxes en toute sécurité et suivez vos paiements en temps réel.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center">
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualiser
        </Button>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Télécharger Reçu
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigate("/history")}>
          <History className="w-4 h-4 mr-2" />
          Historique
        </Button>
      </div>
    </div>
  );
};