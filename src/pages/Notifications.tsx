import { useState } from "react";
import { Header } from "@/components/Header";
import { NotificationFilters } from "@/components/notifications/NotificationFilters";
import { NotificationHeader } from "@/components/notifications/NotificationHeader";
import { NotificationList } from "@/components/notifications/NotificationList";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { NotificationFilter, Notification } from "@/types/notifications";

const Notifications = () => {
  const [activeFilters, setActiveFilters] = useState<NotificationFilter>({
    type: "all",
    status: "all",
    priority: "all",
    date: null,
    location: "all",
    search: "",
  });
  
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const notifications: Notification[] = [
    {
      id: "1",
      type: "NEW_PROPERTY",
      priority: "HIGH",
      status: "UNREAD",
      title: "Nouveau bien disponible à Ain Sebaa",
      message: "Un nouveau bien est disponible dans le quartier Ain Sebaa, Casablanca (TF-12345).",
      date: new Date().toISOString(),
      read: false,
      metadata: {
        titleDeedNumber: "TF-12345",
        surface: 1200,
        price: 2500000,
      }
    },
    {
      id: "2",
      type: "PROPERTY_UPDATE",
      priority: "MEDIUM",
      status: "READ",
      title: "Mise à jour de statut",
      message: "Le prix du bien TF-56789 a été ajusté à la baisse.",
      date: new Date(Date.now() - 86400000).toISOString(),
      read: true,
      metadata: {
        titleDeedNumber: "TF-56789",
      }
    },
    {
      id: "3",
      type: "MESSAGE",
      priority: "LOW",
      status: "UNREAD",
      title: "Nouveau message du propriétaire",
      message: "Le propriétaire du bien TF-11223 a répondu à votre demande d'information.",
      date: new Date(Date.now() - 172800000).toISOString(),
      read: false,
      metadata: {
        titleDeedNumber: "TF-11223",
      },
      actions: {
        primary: {
          label: "Répondre",
          action: () => {
            toast({
              title: "Message",
              description: "Ouverture de la conversation...",
            });
          },
        },
      },
    },
    {
      id: "4",
      type: "DOCUMENT",
      priority: "MEDIUM",
      status: "UNREAD",
      title: "Nouveau document disponible",
      message: "Un nouveau plan cadastral a été ajouté pour le bien TF-99876.",
      date: new Date(Date.now() - 259200000).toISOString(),
      read: false,
      metadata: {
        titleDeedNumber: "TF-99876",
        documentType: "Plan cadastral",
        documentUrl: "/documents/plan-cadastral-99876.pdf",
      },
      actions: {
        primary: {
          label: "Télécharger",
          action: () => {
            toast({
              title: "Téléchargement",
              description: "Le document est en cours de téléchargement...",
            });
          },
        },
        secondary: {
          label: "Aperçu",
          action: () => {
            toast({
              title: "Aperçu",
              description: "Ouverture de l'aperçu du document...",
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

  const handleExport = () => {
    toast({
      title: "Export",
      description: "L'export des notifications est en cours...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <NotificationHeader 
            onMarkAllAsRead={handleMarkAllAsRead}
            onRefresh={handleRefresh}
            onExport={handleExport}
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