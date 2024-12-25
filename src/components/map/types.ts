import { Dispatch, SetStateAction } from "react";
import { UserRole } from "@/types/auth";

export interface MapFilters {
  searchTerm: string;
  location: string;
  priceRange: [number, number];
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
}

export interface MapFiltersProps {
  filters: MapFilters;
  setFilters: Dispatch<SetStateAction<MapFilters>>;
  onApplyFilters: () => void;
  userRole?: UserRole;
}

export interface MobileFiltersSheetProps {
  filters: MapFilters;
  setFilters: Dispatch<SetStateAction<MapFilters>>;
  filteredParcelsCount: number;
  userRole?: UserRole;
}
