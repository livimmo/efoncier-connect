import { Parcel } from "@/utils/mockData/types";
import { Property } from "@/types";
import { UserRole } from "@/types/auth";

export type MapSettings = {
  theme: "light" | "dark";
  unit: "metric" | "imperial";
};

export interface MapContainerProps {
  userRole: UserRole;
  onParcelSelect: (parcelId: string) => void;
}

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

export interface DraggableParcelInfoProps extends ParcelInfoProps {
  markerPosition?: { x: number; y: number };
}

export interface MapMobileControlsProps {
  settings: MapSettings;
  onSettingChange: (setting: keyof MapSettings, value: string) => void;
  onFilterClick?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onLocateMe?: () => void;
}

export type ParcelToPropertyMapper = (parcel: Parcel) => Property;