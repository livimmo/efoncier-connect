import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HelpCircle, Phone, MessageSquare, Globe, Settings, FileText, History, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChatBubble } from "../chat/ChatBubble";

interface MobileFooterMenuProps {
  open: boolean;
  onClose: () => void;
}

export const MobileFooterMenu = ({ open, onClose }: MobileFooterMenuProps) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: Users,
      label: "Annuaire",
      onClick: () => {
        navigate("/directory");
        onClose();
      },
    },
    {
      icon: Settings,
      label: "Paramètres",
      onClick: () => {
        navigate("/settings");
        onClose();
      },
    },
    {
      icon: FileText,
      label: "Documents",
      onClick: () => {
        navigate("/documents");
        onClose();
      },
    },
    {
      icon: History,
      label: "Historique",
      onClick: () => {
        navigate("/history");
        onClose();
      },
    },
    {
      icon: MessageSquare,
      label: "Messages",
      onClick: () => {
        navigate("/messages");
        onClose();
      },
    },
    {
      icon: HelpCircle,
      label: "FAQ",
      onClick: () => {
        navigate("/faq");
        onClose();
      },
    },
    {
      icon: Phone,
      label: "Contact",
      onClick: () => {
        navigate("/contact");
        onClose();
      },
    },
    {
      icon: Globe,
      label: "Langue",
      onClick: () => {
        onClose();
      },
    },
  ];

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[70vh] px-0">
        <div className="grid grid-cols-3 gap-4 p-4">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="outline"
              className="flex h-auto flex-col gap-2 p-4"
              onClick={item.onClick}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
        <div className="p-4 border-t">
          <ChatBubble />
        </div>
      </SheetContent>
    </Sheet>
  );
};