import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { MapFilters } from './MapFilters';
import { MapFilters as MapFiltersType } from './types';
import { useToast } from "@/hooks/use-toast";

interface MobileFiltersSheetProps {
  filters: MapFiltersType;
  setFilters: (filters: MapFiltersType) => void;
  filteredParcelsCount: number;
}

export const MobileFiltersSheet = ({ 
  filters, 
  setFilters, 
  filteredParcelsCount 
}: MobileFiltersSheetProps) => {
  const { toast } = useToast();

  return (
    <div className="absolute top-4 left-4 z-10">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary" size="sm" className="shadow-lg">
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[85vw] sm:w-[385px] p-4">
          <MapFilters 
            filters={filters}
            setFilters={setFilters}
            onApplyFilters={() => {
              toast({
                title: "Filtres appliqués",
                description: `${filteredParcelsCount} parcelles trouvées`,
              });
            }}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};