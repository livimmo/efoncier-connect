import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: "payment" | "status" | "critical";
  message: string;
  date: string;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    message: "5 biens avec plus de 6 mois de retard de paiement",
    date: "2024-03-15"
  },
  {
    id: "2",
    type: "payment",
    message: "Nouveau paiement reçu pour TF-123456",
    date: "2024-03-14"
  },
  {
    id: "3",
    type: "status",
    message: "Mise à jour du statut pour 3 biens",
    date: "2024-03-13"
  }
];

export const CommuneAlertsWidget = () => {
  return (
    <Card className="col-span-1">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Alertes Récentes</h3>
            <p className="text-sm text-muted-foreground">Notifications importantes</p>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {mockAlerts.map((alert) => (
            <div 
              key={alert.id}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Badge 
                variant={alert.type === "critical" ? "destructive" : "default"}
                className={cn(
                  "rounded-full",
                  alert.type === "payment" && "bg-green-500",
                  alert.type === "status" && "bg-blue-500"
                )}
              >
                {alert.type === "critical" ? "!" : "●"}
              </Badge>
              <div className="flex-1">
                <p className="text-sm">{alert.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(alert.date).toLocaleDateString()}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};