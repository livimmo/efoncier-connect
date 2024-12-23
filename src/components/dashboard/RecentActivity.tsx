import { Card } from "@/components/ui/card";
import { CreditCard, MapPin, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    type: "payment",
    title: "Paiement effectué",
    description: "Parcelle #TF123456",
    timestamp: "Il y a 2 heures",
  },
  {
    id: 2,
    type: "message",
    title: "Nouveau message",
    description: "De: Service Cadastre",
    timestamp: "Il y a 3 heures",
  },
  {
    id: 3,
    type: "location",
    title: "Nouvelle parcelle ajoutée",
    description: "Ain Sebaa, Casablanca",
    timestamp: "Il y a 1 jour",
  },
];

export const RecentActivity = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <CreditCard className="h-4 w-4" />;
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      case "location":
        return <MapPin className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "payment":
        return "text-green-500 bg-green-500/10";
      case "message":
        return "text-blue-500 bg-blue-500/10";
      case "location":
        return "text-orange-500 bg-orange-500/10";
      default:
        return "";
    }
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Activités Récentes</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className={cn("p-2 rounded-full", getIconColor(activity.type))}>
              {getIcon(activity.type)}
            </div>
            <div className="flex-1">
              <p className="font-medium">{activity.title}</p>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};