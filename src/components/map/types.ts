import { Parcel } from "@/utils/mockData/types";

export type UserRole = "admin" | "developer" | "owner" | "commune";

export type MapSettings = {
  theme: "light" | "dark";
  unit: "metric" | "imperial";
};

export interface ParcelInfoProps {
  parcel: Parcel;
  onClose: () => void;
  className?: string;
  userRole: UserRole;
}

export interface MapFiltersProps {
  filters: MapFilters;
  setFilters: React.Dispatch<React.SetStateAction<MapFilters>>;
  onApplyFilters: () => void;
  userRole: UserRole;
}

export interface MobileFiltersSheetProps {
  filters: MapFilters;
  setFilters: React.Dispatch<React.SetStateAction<MapFilters>>;
  filteredParcelsCount: number;
  userRole: UserRole;
}

export interface MapFilters {
  search: string;
  priceRange: [number, number];
  surfaceRange: [number, number];
  status: string[];
  type: string[];
  date: Date | undefined;
}