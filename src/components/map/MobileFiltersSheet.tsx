import { Dispatch, SetStateAction } from "react";
import { MapFilters } from "./types";
import { UserRole } from "@/types/auth";

export interface MobileFiltersSheetProps {
  filters: MapFilters;
  setFilters: Dispatch<SetStateAction<MapFilters>>;
  filteredParcelsCount: number;
  userRole: UserRole;
  onApplyFilters: () => void;
}

export const MobileFiltersSheet = ({ 
  filters, 
  setFilters, 
  filteredParcelsCount, 
  userRole,
  onApplyFilters 
}: MobileFiltersSheetProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-background p-4">
      <h2 className="text-lg font-semibold">Filtres</h2>
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