import { Dispatch, SetStateAction } from "react";
import type { MapFilters as MapFiltersType } from "./types";
import { UserRole } from "@/types/auth";

export interface MapFiltersProps {
  filters: MapFiltersType;
  setFilters: Dispatch<SetStateAction<MapFiltersType>>;
  onApplyFilters: () => void;
  userRole: UserRole;
}

export const MapFilters = ({ filters, setFilters, onApplyFilters, userRole }: MapFiltersProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-lg font-semibold">Filtres de Carte</h3>
      <div className="flex flex-col">
        <label className="text-sm">Type de Propriété</label>
        <select
          value={filters.propertyType}
          onChange={(e) => setFilters({ ...filters, propertyType: e.target.value as MapFiltersType['propertyType'] })}
          className="border rounded p-2"
        >
          <option value="">Tous</option>
          <option value="terrain">Terrain</option>
          <option value="maison">Maison</option>
          <option value="appartement">Appartement</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Statut Fiscal</label>
        <select
          value={filters.fiscalStatus}
          onChange={(e) => setFilters({ ...filters, fiscalStatus: e.target.value as MapFiltersType['fiscalStatus'] })}
          className="border rounded p-2"
        >
          <option value="">Tous</option>
          <option value="compliant">Conforme</option>
          <option value="non_compliant">Non conforme</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Prix Max (DHS)</label>
        <input
          type="number"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
          className="border rounded p-2"
        />
      </div>
      <button
        onClick={onApplyFilters}
        className="bg-blue-500 text-white rounded p-2"
      >
        Appliquer les Filtres
      </button>
    </div>
  );
};