import { Card, CardContent } from "@/components/ui/card";
import { Bell, AlertTriangle, Calendar, Download, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface TNBNotification {
  id: number;
  type: "payment" | "overdue" | "upcoming";
  message: string;
  date: string;
  parcelId: string;
  amount?: string;
  receiptUrl?: string;
}

export const NotificationList = () => {
  const navigate = useNavigate();

  // Mock data - à remplacer par les vraies données
  const notifications: TNBNotification[] = [
    {
      id: 1,
      type: "payment",
      message: "Votre paiement pour le titre foncier TF#123456 a été confirmé avec succès.",
      date: "15/06/2024",
      parcelId: "TF#123456",
      amount: "25 000 MAD",
      receiptUrl: "/receipt/TX2024-001"
    },
    {
      id: 2,
      type: "overdue",
      message: "Le paiement pour le titre foncier TF#345678 est en retard depuis le 05/12/2023.",
      date: "05/12/2023",
      parcelId: "TF#345678",
      amount: "20 000 MAD"
    },
    {
      id: 3,
      type: "upcoming",
      message: "Le paiement de votre TNB pour le titre foncier TF#567890 arrive à échéance le 30/06/2024.",
      date: "30/06/2024",
      parcelId: "TF#567890"
    }
  ];

  const getNotificationIcon = (type: TNBNotification["type"]) => {
    switch (type) {
      case "payment":
        return <Bell className="w-5 h-5" />;
      case "overdue":
        return <AlertTriangle className="w-5 h-5" />;
      case "upcoming":
        return <Calendar className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: TNBNotification["type"]) => {
    switch (type) {
      case "payment":
        return "bg-green-100 text-green-600";
      case "overdue":
        return "bg-red-100 text-red-600";
      case "upcoming":
        return "bg-yellow-100 text-yellow-600";
    }
  };

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card key={notification.id}>
          <CardContent className="flex items-center gap-4 p-4">
            <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">
                {notification.date}
              </p>
              <p className="mb-2">{notification.message}</p>
              <div className="flex gap-2">
                {notification.receiptUrl && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(notification.receiptUrl!)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger le reçu
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/map?parcel=${notification.parcelId}`)}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Voir sur la carte
                </Button>
                {notification.type === "overdue" && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => navigate(`/payment/${notification.parcelId}`)}
                  >
                    Payer maintenant
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};