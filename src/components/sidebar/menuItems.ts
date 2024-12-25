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
  HelpCircle,
} from "lucide-react";
import { MenuItems } from "./types";

const commonItems = [
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Settings, label: "Paramètres", href: "/settings" },
  { icon: HelpCircle, label: "Support & FAQ", href: "/support" },
];

export const roleSpecificItems: MenuItems = {
  owner: [
    { icon: LayoutDashboard, label: "Tableau de Bord", href: "/owner/dashboard" },
    { icon: Building2, label: "Mes Biens", href: "/owner/properties" },
    { icon: Plus, label: "Ajouter un Terrain", href: "/owner/property/add" },
    { icon: CreditCard, label: "Paiements", href: "/payments" },
    { icon: MessageSquare, label: "Messagerie", href: "/messages" },
  ],
  developer: [
    { icon: LayoutDashboard, label: "Tableau de Bord", href: "/developer/dashboard" },
    { icon: Building2, label: "Mes Biens", href: "/developer/properties" },
    { icon: MapPin, label: "Carte Interactive", href: "/map" },
    { icon: MessageSquare, label: "Messagerie", href: "/messages" },
    { icon: Search, label: "Recherche Avancée", href: "/search" },
  ],
  commune: [
    { icon: LayoutDashboard, label: "Tableau de Bord", href: "/commune/dashboard" },
    { icon: Users, label: "Propriétaires", href: "/commune/owners" },
    { icon: Building2, label: "Gestion des Biens", href: "/commune/properties" },
    { icon: CreditCard, label: "Paiements", href: "/commune/payments" },
    { icon: BarChart, label: "Statistiques", href: "/commune/stats" },
  ],
  admin: [
    { icon: LayoutDashboard, label: "Tableau de Bord", href: "/admin/dashboard" },
    { icon: Users, label: "Utilisateurs", href: "/admin/users" },
    { icon: FileText, label: "Transactions", href: "/admin/transactions" },
    { icon: BarChart, label: "Rapports", href: "/admin/reports" },
  ],
};

export const getMenuItems = (role: string) => {
  return [...(roleSpecificItems[role as keyof MenuItems] || roleSpecificItems.owner), ...commonItems];
};