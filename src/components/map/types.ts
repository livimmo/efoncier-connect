import { UserRole } from "@/types/auth";
import { PropertyType, ZoneType } from "@/utils/mockData/types";

export interface MapFilters {
  region: string;
  commune: string;
  propertyType: PropertyType | "";
  zoneType: ZoneType | "";
  size: [number, number];
  status: string;
  ownerName: string;
  titleDeedNumber: string;
  lastPaymentDate: string | null;
  fiscalStatus: string;
  maxPrice: number;
}

export interface MapSettings {
  theme: 'light' | 'dark';
  unit: 'metric' | 'imperial';
}

export interface MapMobileControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLocate: () => void;
}

export interface MapFiltersProps {
  filters: MapFilters;
  setFilters: React.Dispatch<React.SetStateAction<MapFilters>>;
  onApplyFilters: () => void;
  userRole: UserRole;
}