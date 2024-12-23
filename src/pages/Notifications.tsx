import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Search, Settings, Archive, MessageCircle, CreditCard, Building2, AlertTriangle, Calendar, RefreshCw } from "lucide-react";

// Types for our notifications
type NotificationType = "message" | "payment" | "property" | "warning" | "reminder" | "transaction" | "system";
type NotificationPriority = "high" | "medium" | "low";

interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  date: string;
  read: boolean;
  actions?: {
    primary?: {
      label: string;
      action: () => void;
    };
    secondary?: {
      label: string;
      action: () => void;
    };
  };
}

const Notifications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "important">("all");

  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: "1",
      type: "payment",
      priority: "high",
      title: "Paiement en attente",
      message: "Vous avez une taxe foncière en attente de paiement pour la parcelle #12345",
      date: "2024-02-20",
      read: false,
      actions: {
        primary: {
          label: "Payer maintenant",
          action: () => console.log("Redirect to payment"),
        },
      },
    },
    {
      id: "2",
      type: "property",
      priority: "medium",
      title: "Mise à jour de statut",
      message: "Le statut de votre parcelle à Ain Sebaa a été mis à jour",
      date: "2024-02-19",
      read: true,
    },
    {
      id: "3",
      type: "message",
      priority: "low",
      title: "Nouveau message",
      message: "Vous avez reçu un nouveau message concernant votre demande d'information",
      date: "2024-02-18",
      read: false,
      actions: {
        primary: {
          label: "Lire le message",
          action: () => console.log("Open message"),
        },
      },
    },
  ];

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "message":
        return <MessageCircle className="h-5 w-5" />;
      case "payment":
        return <CreditCard className="h-5 w-5" />;
      case "property":
        return <Building2 className="h-5 w-5" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5" />;
      case "reminder":
        return <Calendar className="h-5 w-5" />;
      case "transaction":
        return <RefreshCw className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getPriorityColor = (priority: NotificationPriority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-6 mt-16">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold">Notifications</h1>
                <Badge variant="secondary" className="text-sm">
                  {notifications.filter(n => !n.read).length} nouvelles
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Archive className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher dans les notifications..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger value="all">Toutes</TabsTrigger>
                  <TabsTrigger value="unread">Non lues</TabsTrigger>
                  <TabsTrigger value="important">Importantes</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4 mt-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${
                        notification.read ? "bg-white" : "bg-blue-50"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full ${getPriorityColor(notification.priority)}`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{notification.title}</h3>
                            <span className="text-sm text-gray-500">
                              {new Date(notification.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-600 mt-1">{notification.message}</p>
                          {notification.actions && (
                            <div className="flex gap-2 mt-3">
                              {notification.actions.primary && (
                                <Button
                                  size="sm"
                                  onClick={notification.actions.primary.action}
                                >
                                  {notification.actions.primary.label}
                                </Button>
                              )}
                              {notification.actions.secondary && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={notification.actions.secondary.action}
                                >
                                  {notification.actions.secondary.label}
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="unread" className="space-y-4 mt-4">
                  {notifications
                    .filter((n) => !n.read)
                    .map((notification) => (
                      // ... Same notification card structure as above
                      <div key={notification.id}>...</div>
                    ))}
                </TabsContent>

                <TabsContent value="important" className="space-y-4 mt-4">
                  {notifications
                    .filter((n) => n.priority === "high")
                    .map((notification) => (
                      // ... Same notification card structure as above
                      <div key={notification.id}>...</div>
                    ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;