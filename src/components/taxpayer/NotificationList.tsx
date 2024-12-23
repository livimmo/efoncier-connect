import { Card, CardContent } from "@/components/ui/card";
import { Bell, AlertTriangle } from "lucide-react";

export const NotificationList = () => {
  const notifications = [
    {
      id: 1,
      type: "reminder",
      message: "Rappel : Paiement dû le 30/06/2024",
      icon: Bell,
      severity: "info",
    },
    {
      id: 2,
      type: "alert",
      message: "Alerte : Terrain TF#12345 en retard de paiement",
      icon: AlertTriangle,
      severity: "warning",
    },
  ];

  return (
    <div className="space-y-4">
      {notifications.map((notification) => {
        const Icon = notification.icon;
        return (
          <Card key={notification.id}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className={`p-2 rounded-full ${
                notification.severity === "warning" 
                  ? "bg-yellow-100 text-yellow-600" 
                  : "bg-blue-100 text-blue-600"
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="flex-1">{notification.message}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};