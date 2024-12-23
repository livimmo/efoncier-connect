import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HelpCircle, Phone, MessageSquare, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MobileFooterMenuProps {
  open: boolean;
  onClose: () => void;
}

export const MobileFooterMenu = ({ open, onClose }: MobileFooterMenuProps) => {
  const navigate = useNavigate();

  const menuItems = [
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
      icon: MessageSquare,
      label: "Support",
      onClick: () => {
        navigate("/support");
        onClose();
      },
    },
    {
      icon: Globe,
      label: "Langue",
      onClick: () => {
        // TODO: Implement language switcher
        onClose();
      },
    },
  ];

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[40vh]">
        <div className="grid grid-cols-2 gap-4 p-4">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="outline"
              className="flex h-auto flex-col gap-2 p-4"
              onClick={item.onClick}
            >
              <item.icon className="h-6 w-6" />
              <span>{item.label}</span>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};