import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { HistoryCharts } from "@/components/history/HistoryCharts";
import { HistoryStats } from "@/components/history/HistoryStats";

export const StatsTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Statistiques et Rapports</h2>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Télécharger le Rapport
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vue d'ensemble</CardTitle>
        </CardHeader>
        <CardContent>
          <HistoryStats />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Évolution Temporelle</CardTitle>
        </CardHeader>
        <CardContent>
          <HistoryCharts />
        </CardContent>
      </Card>
    </div>
  );
};