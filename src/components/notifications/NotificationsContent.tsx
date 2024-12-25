import { NotificationsFilters } from "./NotificationsFilters";
import { NotificationsList } from "./NotificationsList";
import type { NotificationFilter } from "@/types/notifications";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

interface NotificationsContentProps {
  filters: NotificationFilter;
  onFiltersChange: (filters: NotificationFilter) => void;
}

export const NotificationsContent = ({
  filters,
  onFiltersChange,
}: NotificationsContentProps) => {
  const isMobile = useIsMobile();

  const FiltersComponent = (
    <NotificationsFilters filters={filters} onChange={onFiltersChange} />
  );

  return (
    <div className="grid gap-6 md:grid-cols-[240px_1fr]">
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filtres
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            {FiltersComponent}
          </SheetContent>
        </Sheet>
      ) : (
        <aside>{FiltersComponent}</aside>
      )}
      <NotificationsList filters={filters} />
    </div>
  );
};