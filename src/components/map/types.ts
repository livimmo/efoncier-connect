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
  userRole?: UserRole;
}

export interface MapFilters {
  search: string;
  region: string;
  commune: string;
  propertyType: string;
  zoneType: string;
  size: [number, number];
  status: string[];
  type: string[];
  ownerName: string;
  titleDeedNumber: string;
  lastPaymentDate: string | null;
  priceRange: [number, number];
  surfaceRange: [number, number];
  date?: Date;
}

export interface MapFiltersProps {
  filters: MapFilters;
  setFilters: (filters: MapFilters) => void;
  onApplyFilters: () => void;
  userRole?: UserRole;
}

export interface MobileFiltersSheetProps {
  filters: MapFilters;
  setFilters: (filters: MapFilters) => void;
  filteredParcelsCount: number;
  userRole?: UserRole;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface MapMobileControlsProps {
  settings: MapSettings;
  onSettingChange: (setting: keyof MapSettings, value: string) => void;
  onFilterClick?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onLocateMe?: () => void;
}

export interface DraggableParcelInfoProps {
  parcel: Parcel;
  onClose: () => void;
  className?: string;
  userRole?: UserRole;
  markerPosition?: { x: number; y: number };
}