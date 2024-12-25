import { useState } from "react";
import { Header } from "@/components/Header";
import { NotificationFilters } from "@/components/notifications/NotificationFilters";
import { NotificationHeader } from "@/components/notifications/NotificationHeader";
import { NotificationList } from "@/components/notifications/NotificationList";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Notification, NotificationFilter } from "@/types/notifications";

const CommuneNotifications = () => {
  const [activeFilters, setActiveFilters] = useState<NotificationFilter>({
    type: "all",
    status: "all",
    date: null,
    location: "all",
    search: "",
  });
  
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Mock notifications for commune
  const notifications: Notification[] = [
    {
      id: "1",
      type: "payment",
      priority: "high",
      title: "Retards de Paiement TNB",
      message: "20 biens dans le quartier Ain Sebaa ont dépassé la date limite de paiement de la TNB.",
      date: new Date().toISOString(),
      read: false,
      metadata: {
        titleDeedNumber: "Multiple",
      },
      actions: {
        primary: {
          label: "Voir les Biens",
          action: () => {
            toast({
              title: "Navigation",
              description: "Redirection vers la liste des biens en retard...",
            });
          },
        },
        secondary: {
          label: "Envoyer Rappels",
          action: () => {
            toast({
              title: "Rappels",
              description: "Envoi des rappels en cours...",
            });
          },
        },
      },
    },
    {
      id: "2",
      type: "fiscal_status",
      priority: "medium",
      title: "Mise à jour de statut fiscal",
      message: "Le bien TF-12345 a été régularisé avec succès.",
      date: new Date(Date.now() - 86400000).toISOString(),
      read: true,
      metadata: {
        titleDeedNumber: "TF-12345",
      },
    },
    {
      id: "3",
      type: "message",
      priority: "low",
      title: "Nouvelle demande d'information",
      message: "Un propriétaire a envoyé une demande d'informations sur la régularisation du bien TF-33445.",
      date: new Date(Date.now() - 172800000).toISOString(),
      read: false,
      metadata: {
        titleDeedNumber: "TF-33445",
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
      type: "report",
      priority: "medium",
      title: "Nouveau rapport disponible",
      message: "Le rapport mensuel sur les statuts fiscaux est prêt à être consulté.",
      date: new Date(Date.now() - 259200000).toISOString(),
      read: false,
      actions: {
        primary: {
          label: "Voir le Rapport",
          action: () => {
            toast({
              title: "Rapport",
              description: "Ouverture du rapport mensuel...",
            });
          },
        },
        secondary: {
          label: "Télécharger",
          action: () => {
            toast({
              title: "Téléchargement",
              description: "Le rapport est en cours de téléchargement...",
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

export default CommuneNotifications;
