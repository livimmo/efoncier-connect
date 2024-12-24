import { PropertyType, ZoneType } from "@/utils/mockData/types";
import type { Parcel } from "@/utils/mockData/types";

export interface MapFilters {
  region: string;
  commune: string;
  propertyType: PropertyType | '';
  zoneType: ZoneType | '';
  size: [number, number];
  status: 'PAID' | 'PENDING' | 'OVERDUE' | '';
  ownerName: string;
  titleDeedNumber: string;
}

export interface MapControls {
  showFilters: boolean;
  show3DView: boolean;
  showComparison: boolean;
  showHistory: boolean;
}

export interface MapSettings {
  theme: 'light' | 'dark';
  unit: 'metric' | 'imperial';
}

export interface MapFiltersProps {
  filters: MapFilters;
  setFilters: (filters: MapFilters) => void;
  onApplyFilters: () => void;
  className?: string;
}

export interface MapControlsProps {
  controls: MapControls;
  settings: MapSettings;
  onControlChange: (control: keyof MapControls) => void;
  onSettingChange: (setting: keyof MapSettings, value: any) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onLocateMe: () => void;
  className?: string;
}

export interface MapMobileControlsProps {
  settings: MapSettings;
  onSettingChange: (key: keyof MapSettings, value: any) => void;
  onFilterClick?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onLocateMe?: () => void;
}

export interface MobileFiltersSheetProps {
  filters: MapFilters;
  setFilters: (filters: MapFilters) => void;
  filteredParcelsCount: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export type { Parcel };