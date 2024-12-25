import { useState } from "react";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationList } from "@/components/notifications/NotificationList";
import type { Notification } from "@/components/notifications/types";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

const Notifications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "important">("all");
  const { toast } = useToast();

  // Données de démonstration pour les notifications
  const notifications: Notification[] = [
    {
      id: "1",
      type: "payment",
      priority: "high",
      title: "Paiement en attente",
      message: "Vous avez une taxe foncière en attente de paiement pour la parcelle #12345",
      date: new Date().toISOString(),
      read: false,
      actions: {
        primary: {
          label: "Payer maintenant",
          action: () => {
            toast({
              title: "Redirection",
              description: "Redirection vers la page de paiement...",
            });
          },
        },
      },
    },
    {
      id: "2",
      type: "property",
      priority: "medium",
      title: "Mise à jour de statut",
      message: "Le statut de votre parcelle à Ain Sebaa a été mis à jour",
      date: new Date(Date.now() - 86400000).toISOString(),
      read: true,
    },
    {
      id: "3",
      type: "message",
      priority: "low",
      title: "Nouveau message",
      message: "Vous avez reçu un nouveau message concernant votre demande d'information",
      date: new Date(Date.now() - 172800000).toISOString(),
      read: false,
      actions: {
        primary: {
          label: "Lire le message",
          action: () => {
            toast({
              title: "Message",
              description: "Ouverture du message...",
            });
          },
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
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <span className="text-sm text-muted-foreground">
              {filteredNotifications.filter(n => !n.read).length} non lues
            </span>
          </div>
          
          <div className="mb-6">
            <Input
              placeholder="Rechercher dans les notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setActiveFilter(value as typeof activeFilter)}>
            <TabsList className="w-full justify-start mb-6">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="unread">Non lues</TabsTrigger>
              <TabsTrigger value="important">Importantes</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[calc(100vh-300px)]">
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
            </ScrollArea>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Notifications;