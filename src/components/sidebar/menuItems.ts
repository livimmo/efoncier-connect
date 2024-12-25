import {
  LayoutDashboard,
  Plus,
  FileText,
  MessageSquare,
  CreditCard,
  MapPin,
  Search,
  Building2,
  BarChart,
  Users,
  Bell,
  Settings,
} from "lucide-react";
import { MenuItems } from "./types";

const commonItems = [
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Settings, label: "Paramètres", href: "/settings" },
];

export const roleSpecificItems: MenuItems = {
  owner: [
    { icon: LayoutDashboard, label: "Tableau de Bord", href: "/owner/dashboard" },
    { icon: Building2, label: "Mes Biens", href: "/owner/properties" },
    { icon: Plus, label: "Ajouter un Terrain", href: "/property/add" },
    { icon: CreditCard, label: "Paiements", href: "/owner/payments" },
    { icon: MessageSquare, label: "Messagerie", href: "/messages" },
    { icon: FileText, label: "Historique", href: "/history" },
  ],
  developer: [
    { icon: LayoutDashboard, label: "Tableau de Bord", href: "/developer/dashboard" },
    { icon: Building2, label: "Mes Projets", href: "/developer/properties" },
    { icon: MapPin, label: "Carte Interactive", href: "/map" },
    { icon: MessageSquare, label: "Messagerie", href: "/messages" },
    { icon: Search, label: "Recherche Avancée", href: "/search" },
    { icon: FileText, label: "Historique", href: "/history" },
  ],
  commune: [
    { icon: LayoutDashboard, label: "Tableau de Bord", href: "/commune/dashboard" },
    { icon: Users, label: "Propriétaires", href: "/commune/owners" },
    { icon: Building2, label: "Gestion des Biens", href: "/commune/properties" },
    { icon: CreditCard, label: "Paiements", href: "/commune/payments" },
    { icon: BarChart, label: "Statistiques", href: "/commune/stats" },
    { icon: FileText, label: "Historique", href: "/history" },
  ],
  admin: [
    { icon: LayoutDashboard, label: "Tableau de Bord", href: "/admin/dashboard" },
    { icon: Users, label: "Utilisateurs", href: "/admin/users" },
    { icon: FileText, label: "Transactions", href: "/admin/transactions" },
    { icon: BarChart, label: "Rapports", href: "/admin/reports" },
    { icon: Building2, label: "Gestion des Biens", href: "/admin/properties" },
  ],
};

export const getMenuItems = (role: string) => {
  return [...(roleSpecificItems[role as keyof MenuItems] || roleSpecificItems.owner), ...commonItems];
};