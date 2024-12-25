import { useState } from "react";
import { Header } from "@/components/Header";
import { NotificationFilters } from "@/components/notifications/NotificationFilters";
import { NotificationHeader } from "@/components/notifications/NotificationHeader";
import { NotificationList } from "@/components/notifications/NotificationList";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Notification, NotificationFilter } from "@/components/notifications/types";

const Notifications = () => {
  const [activeFilters, setActiveFilters] = useState<NotificationFilter>({
    type: "all",
    status: "all",
    date: null,
    search: "",
  });
  
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Mock notifications - à remplacer par des données réelles
  const notifications: Notification[] = [
    {
      id: "1",
      type: "payment",
      priority: "high",
      title: "TNB en attente de paiement",
      message: "Votre TNB est due avant le 30 juin pour le bien TF-12345",
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
      message: "Le statut de votre bien TF-56789 a été mis à jour",
      date: new Date(Date.now() - 86400000).toISOString(),
      read: true,
    },
    {
      id: "3",
      type: "message",
      priority: "low",
      title: "Nouveau message",
      message: "Un promoteur a envoyé un message concernant votre bien TF-12345",
      date: new Date(Date.now() - 172800000).toISOString(),
      read: false,
      actions: {
        primary: {
          label: "Voir le message",
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

  const handleMarkAllAsRead = () => {
    toast({
      title: "Succès",
      description: "Toutes les notifications ont été marquées comme lues",
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Actualisation",
      description: "Les notifications ont été actualisées",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <NotificationHeader 
            onMarkAllAsRead={handleMarkAllAsRead}
            onRefresh={handleRefresh}
            unreadCount={notifications.filter(n => !n.read).length}
          />
          
          <div className="mt-6 grid gap-6 md:grid-cols-[240px_1fr]">
            {!isMobile && (
              <aside className="space-y-6">
                <NotificationFilters
                  filters={activeFilters}
                  onChange={setActiveFilters}
                />
              </aside>
            )}
            
            <ScrollArea className="h-[calc(100vh-300px)]">
              <NotificationList 
                notifications={notifications}
                filters={activeFilters}
              />
            </ScrollArea>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;