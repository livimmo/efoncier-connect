import { PropertyType, ZoneType } from "@/utils/mockData/types";

export interface MapFilters {
  city: string;
  propertyType: PropertyType | '';
  zoneType: ZoneType | '';
  size: [number, number];
  status: 'PAID' | 'PENDING' | 'OVERDUE' | '';
  bank?: string;
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