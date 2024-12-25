import { Button } from "@/components/ui/button";

interface FilterActionsProps {
  onApplyFilters: () => void;
  onReset?: () => void;
}

export const FilterActions = ({ onApplyFilters, onReset }: FilterActionsProps) => {
  return (
    <div className="space-y-2">
      <Button className="w-full" onClick={onApplyFilters}>
        Appliquer les filtres
      </Button>
      {onReset && (
        <Button variant="outline" className="w-full" onClick={onReset}>
          Réinitialiser
        </Button>
      )}
    </div>
  );
};