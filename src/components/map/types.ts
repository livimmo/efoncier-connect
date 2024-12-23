import { PropertyType, ZoneType } from "@/utils/mockData/types";

export interface MapFilters {
  city: string;
  propertyType: PropertyType | '';
  zoneType: ZoneType | '';
  size: [number, number];
  status: 'PAID' | 'PENDING' | 'OVERDUE' | '';
  bank?: string;
}

export interface MapFiltersProps {
  filters: MapFilters;
  setFilters: (filters: MapFilters) => void;
  onApplyFilters: () => void;
  className?: string;
}

export interface MapControls {
  showFilters: boolean;
  show3DView: boolean;
  showComparison: boolean;
  showHistory: boolean;
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

export interface MapSettings {
  theme: 'light' | 'dark';
  unit: 'metric' | 'imperial';
}