import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HistoryHeaderProps {
  onExport: (format: "pdf" | "excel" | "csv") => void;
}

export function HistoryHeader({ onExport }: HistoryHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">📊 Historique des Activités</h1>
        <p className="text-muted-foreground mt-2">
          Consultez l'ensemble de vos transactions, paiements et interactions passées
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <FileDown className="mr-2" />
            Exporter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onExport("pdf")}>
            Format PDF
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport("excel")}>
            Format Excel
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport("csv")}>
            Format CSV
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}