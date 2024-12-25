import { Dispatch, SetStateAction } from "react";
import { MapFilters } from "./types";
import { UserRole } from "@/types/auth";

export interface MobileFiltersSheetProps {
  filters: MapFilters;
  setFilters: Dispatch<SetStateAction<MapFilters>>;
  filteredParcelsCount: number;
  userRole: UserRole;
}

export const MobileFiltersSheet = ({ filters, setFilters, filteredParcelsCount, userRole }: MobileFiltersSheetProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-background p-4">
      <h2 className="text-lg font-semibold">Filtres</h2>
      <div className="mt-4">
        {/* Example filter for property type */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={filters.propertyType.includes("house")}
            onChange={() => {
              const newFilters = { ...filters };
              if (newFilters.propertyType.includes("house")) {
                newFilters.propertyType = newFilters.propertyType.filter(type => type !== "house");
              } else {
                newFilters.propertyType.push("house");
              }
              setFilters(newFilters);
            }}
          />
          <label className="ml-2">Maison</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={filters.propertyType.includes("apartment")}
            onChange={() => {
              const newFilters = { ...filters };
              if (newFilters.propertyType.includes("apartment")) {
                newFilters.propertyType = newFilters.propertyType.filter(type => type !== "apartment");
              } else {
                newFilters.propertyType.push("apartment");
              }
              setFilters(newFilters);
            }}
          />
          <label className="ml-2">Appartement</label>
        </div>
        {/* Add more filters as needed */}
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
