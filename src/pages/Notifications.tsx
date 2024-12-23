import { useState } from "react";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationList } from "@/components/notifications/NotificationList";
import type { Notification } from "@/components/notifications/types";

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

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());

    switch (activeFilter) {
      case "unread":
        return !notification.read && matchesSearch;
      case "important":
        return notification.priority === "high" && matchesSearch;
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 mt-16 md:mt-20">
        <div className="max-w-3xl mx-auto">
          {/* Search Input */}
          <div className="mb-6">
            <Input
              placeholder="Rechercher dans les notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setActiveFilter(value as typeof activeFilter)}>
            <TabsList className="w-full justify-start mb-6 overflow-x-auto">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="unread">Non lues</TabsTrigger>
              <TabsTrigger value="important">Importantes</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <NotificationList notifications={filteredNotifications} />
            </TabsContent>

            <TabsContent value="unread">
              <NotificationList 
                notifications={filteredNotifications.filter(n => !n.read)} 
              />
            </TabsContent>

            <TabsContent value="important">
              <NotificationList 
                notifications={filteredNotifications.filter(n => n.priority === "high")} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Notifications;