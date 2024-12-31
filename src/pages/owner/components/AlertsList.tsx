import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, ArrowRight } from "lucide-react";

export const AlertsList = () => {
  const alerts = [
    {
      id: "1",
      title: "Paiement TNB à venir",
      description: "Échéance dans 5 jours pour le bien TF-123456",
      type: "warning"
    },
    {
      id: "2",
      title: "Document expiré",
      description: "La note de renseignement du bien TF-789012 expire bientôt",
      type: "info"
    },
    {
      id: "3",
      title: "Retard de paiement",
      description: "Le paiement du bien TF-345678 est en retard",
      type: "error"
    }
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Alertes</h3>
        <Button variant="ghost" size="sm" className="gap-2">
          Voir Toutes
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[200px]">
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted"
            >
              <Bell className={`h-4 w-4 mt-1 ${
                alert.type === 'error' ? 'text-red-500' :
                alert.type === 'warning' ? 'text-yellow-500' :
                'text-blue-500'
              }`} />
              <div>
                <p className="text-sm font-medium">{alert.title}</p>
                <p className="text-xs text-muted-foreground">{alert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};