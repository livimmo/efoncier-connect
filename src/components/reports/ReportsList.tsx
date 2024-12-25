import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { ReportType } from "@/types/reports";

interface ReportsListProps {
  onSelectReport: (type: ReportType) => void;
}

export const ReportsList = ({ onSelectReport }: ReportsListProps) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Rapports Disponibles</h4>
      <div className="grid grid-cols-1 gap-3">
        <Button 
          variant="outline" 
          className="justify-start w-full"
          onClick={() => onSelectReport('payment')}
        >
          <FileText className="mr-2 h-4 w-4" />
          Rapport des Paiements
        </Button>

        <Button 
          variant="outline"
          className="justify-start w-full"
          onClick={() => onSelectReport('property')}
        >
          <FileText className="mr-2 h-4 w-4" />
          Rapport des Biens
        </Button>

        <Button 
          variant="outline"
          className="justify-start w-full"
          onClick={() => onSelectReport('activity')}
        >
          <FileText className="mr-2 h-4 w-4" />
          Rapport d'Activité
        </Button>
      </div>
    </div>
  );
};