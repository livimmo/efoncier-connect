import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ReportType } from "@/types/reports";

interface ReportActionsProps {
  reportType: ReportType;
}

export const ReportActions = ({ reportType }: ReportActionsProps) => {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Téléchargement du rapport",
      description: `Le rapport ${reportType} a été téléchargé au format PDF.`
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex justify-end gap-2 mb-4">
      <Button 
        size="sm" 
        variant="outline"
        onClick={handleDownload}
      >
        <Download className="mr-2 h-4 w-4" />
        Télécharger
      </Button>
      <Button 
        size="sm" 
        variant="outline"
        onClick={handlePrint}
      >
        <Printer className="mr-2 h-4 w-4" />
        Imprimer
      </Button>
    </div>
  );
};