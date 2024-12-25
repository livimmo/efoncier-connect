import { HistoryHeader } from "@/components/history/HistoryHeader";
import { HistoryFilters } from "@/components/history/HistoryFilters";
import { HistoryTable } from "@/components/history/HistoryTable";
import { HistoryStats } from "@/components/history/HistoryStats";
import { HistoryCharts } from "@/components/history/HistoryCharts";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";

export default function History() {
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    period: "all",
    activityType: "all",
    status: "all",
    amount: [0, 1000000],
    reference: "",
  });

  const handleExport = (format: "pdf" | "excel" | "csv") => {
    toast({
      title: "Export en cours",
      description: `Votre historique sera exporté au format ${format.toUpperCase()}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1">
        <div className="container mx-auto py-8 space-y-8">
          <HistoryHeader onExport={handleExport} />
          <HistoryFilters filters={filters} onChange={setFilters} />
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <HistoryTable filters={filters} />
            </div>
            <div className="space-y-6">
              <HistoryStats />
              <HistoryCharts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}