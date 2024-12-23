import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Map, 
  CreditCard, 
  MessageSquare, 
  HelpCircle, 
  Users,
  Settings,
  LogOut
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const menuItems = [
  {
    title: "Carte Interactive",
    href: "/search",
    icon: Map,
    description: "Explorez les parcelles sur la carte interactive",
    subItems: [
      { title: "Toutes les parcelles", href: "/search" },
      { title: "Recherche avancée", href: "/search/advanced" },
      { title: "Parcelles récentes", href: "/search/recent" },
    ]
  },
  {
    title: "Paiements",
    href: "/payment",
    icon: CreditCard,
    description: "Gérez vos paiements et transactions",
    subItems: [
      { title: "Paiements en attente", href: "/payment/pending" },
      { title: "Historique", href: "/payment/history" },
      { title: "Régler une taxe", href: "/payment/new" },
    ]
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
    description: "Consultez vos messages et conversations",
    subItems: [
      { title: "Boîte de réception", href: "/messages" },
      { title: "Nouveau message", href: "/messages/new" },
      { title: "Archivés", href: "/messages/archived" },
    ]
  },
  {
    title: "Support",
    href: "/support",
    icon: HelpCircle,
    description: "Obtenez de l'aide et consultez la FAQ",
    subItems: [
      { title: "FAQ", href: "/support/faq" },
      { title: "Contact", href: "/support/contact" },
      { title: "Tutoriels", href: "/support/tutorials" },
    ]
  }
];

export function MainMenu() {
  const location = useLocation();

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuTrigger className="h-10">
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {item.subItems.map((subItem) => (
                  <li key={subItem.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={subItem.href}
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          location.pathname === subItem.href && "bg-accent"
                        )}
                      >
                        <div className="text-sm font-medium leading-none">
                          {subItem.title}
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}