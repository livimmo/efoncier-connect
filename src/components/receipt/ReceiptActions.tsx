import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Printer, Mail, History, Map, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface ReceiptActionsProps {
  data: {
    referenceNumber: string;
  };
}

export const ReceiptActions = ({ data }: ReceiptActionsProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDownload = () => {
    // Logique de téléchargement à implémenter
    toast({
      title: "Téléchargement du reçu",
      description: "Le reçu a été téléchargé avec succès.",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    // Logique d'envoi par email à implémenter
    toast({
      title: "Envoi par email",
      description: "Le reçu a été envoyé à votre adresse email.",
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-4">
          <Button onClick={handleDownload} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Télécharger le Reçu (PDF)
          </Button>
          
          <Button onClick={handlePrint} variant="outline" className="w-full">
            <Printer className="w-4 h-4 mr-2" />
            Imprimer le Reçu
          </Button>
          
          <Button onClick={handleEmail} variant="outline" className="w-full">
            <Mail className="w-4 h-4 mr-2" />
            Envoyer par Email
          </Button>

          <div className="border-t pt-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/history')}
              >
                <History className="w-4 h-4 mr-2" />
                Historique
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => navigate('/map')}
              >
                <Map className="w-4 h-4 mr-2" />
                Carte
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              className="w-full mt-4"
              onClick={() => navigate('/dashboard')}
            >
              <Home className="w-4 h-4 mr-2" />
              Tableau de Bord
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};