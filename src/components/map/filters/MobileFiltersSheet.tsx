import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { MapFilters } from "./types";
import { UserRole } from "@/types/auth";

export interface MobileFiltersSheetProps {
  filters: MapFilters;
  setFilters: Dispatch<SetStateAction<MapFilters>>;
  filteredParcelsCount: number;
  userRole: UserRole;
  onApplyFilters: () => void;
  onClose: () => void;
}

export const MobileFiltersSheet = ({ 
  filters, 
  setFilters, 
  filteredParcelsCount, 
  userRole,
  onApplyFilters,
  onClose
}: MobileFiltersSheetProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-background p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filtres</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="mt-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={filters.propertyType === "house"}
            onChange={() => {
              setFilters(prev => ({
                ...prev,
                propertyType: prev.propertyType === "house" ? "" : "house"
              }));
            }}
          />
          <label className="ml-2">Maison</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={filters.propertyType === "apartment"}
            onChange={() => {
              setFilters(prev => ({
                ...prev,
                propertyType: prev.propertyType === "apartment" ? "" : "apartment"
              }));
            }}
          />
          <label className="ml-2">Appartement</label>
        </div>
      </div>
      <div className="mt-4">
        <button
          className="w-full bg-primary text-white py-2 rounded"
          onClick={onApplyFilters}
        >
          Appliquer les filtres ({filteredParcelsCount})
        </button>
      </div>
    </div>
  );
};