import { Filter } from "lucide-react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterHeaderProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobile: boolean;
}

export const FilterHeader = ({ isCollapsed, onToggleCollapse, isMobile }: FilterHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
      {!isCollapsed && <CardTitle>Filtres</CardTitle>}
      <Button
        variant="default"
        size="icon"
        onClick={onToggleCollapse}
        className={cn(
          "absolute z-10 transition-all duration-300 bg-green-500 hover:bg-green-600",
          isMobile ? (
            isCollapsed 
              ? "right-[-40px] top-2" 
              : "right-2 top-2"
          ) : (
            isCollapsed 
              ? "right-[-40px] top-2" 
              : "right-2 top-2"
          )
        )}
      >
        <Filter className="h-4 w-4 text-white" />
      </Button>
    </CardHeader>
  );
};