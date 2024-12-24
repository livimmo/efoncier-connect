import { LucideIcon } from "lucide-react";

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

export interface MenuItems {
  [key: string]: MenuItem[];
}