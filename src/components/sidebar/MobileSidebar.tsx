import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SidebarContent } from "./SidebarContent";
import { MenuItem } from "./types";

interface MobileSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  menuItems: MenuItem[];
  currentPath: string;
  onSignOut: () => void;
}

export const MobileSidebar = ({
  isOpen,
  setIsOpen,
  menuItems,
  currentPath,
  onSignOut,
}: MobileSidebarProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-4 z-40 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] p-0">
        <SidebarContent
          menuItems={menuItems}
          collapsed={false}
          currentPath={currentPath}
          onSignOut={onSignOut}
        />
      </SheetContent>
    </Sheet>
  );
};