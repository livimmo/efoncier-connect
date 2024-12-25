import { Parcel } from "@/utils/mockData/types";
import { UserRole } from "@/types/auth";

export type MapSettings = {
  theme: "light" | "dark";
  unit: "metric" | "imperial";
};

export interface MapFilters {
  search: string;
  region: string;
  commune: string;
  propertyType: string;
  zoneType: string;
  size: [number, number];
  status: string;
  type: string[];
  ownerName: string;
  titleDeedNumber: string;
  lastPaymentDate: Date | null;
  priceRange: [number, number];
  surfaceRange: [number, number];
  date?: Date;
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
  markerPosition?: { x: number; y: number };
}

export interface MobileFiltersSheetProps {
  filters: MapFilters;
  setFilters: (filters: MapFilters) => void;
  filteredParcelsCount: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}