import { PropertyType, ZoneType } from "@/utils/mockData/types";

export interface Cluster {
  id: string;
  center: {
    lat: number;
    lng: number;
  };
  count: number;
  parcels: Parcel[];
  city: string;
  totalArea: number;
  averagePrice: number;
}

export interface MapFilters {
  city: string;
  propertyType: PropertyType | '';
  zoneType: ZoneType | '';
  size: [number, number];
  status: 'PAID' | 'PENDING' | 'OVERDUE' | '';
  bank?: string;
  className?: string;
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

export interface MapFiltersProps {
  filters: MapFilters;
  setFilters: (filters: MapFilters) => void;
  onApplyFilters: () => void;
  className?: string;
}
