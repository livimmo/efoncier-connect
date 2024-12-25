import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FilterHeaderProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const FilterHeader = ({ isCollapsed, onToggleCollapse }: FilterHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      {!isCollapsed && <CardTitle>Filtres</CardTitle>}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleCollapse}
        className="ml-auto"
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </CardHeader>
  );
};