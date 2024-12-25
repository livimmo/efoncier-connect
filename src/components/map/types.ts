import { Dispatch, SetStateAction } from "react";
import { UserRole } from "@/types/auth";

export interface MapSettings {
  theme: 'light' | 'dark';
  unit: 'metric' | 'imperial';
}

export interface MapFilters {
  region: string;
  commune: string;
  propertyType: string;
  zoneType: string;
  size: [number, number];
  status: 'PAID' | 'PENDING' | 'OVERDUE' | '';
  ownerName: string;
  titleDeedNumber: string;
  lastPaymentDate: string | null;
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
}

export interface MapMobileControlsProps {
  settings: MapSettings;
  onSettingChange: (setting: keyof MapSettings, value: string) => void;
  onFilterClick?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onLocateMe?: () => void;
}