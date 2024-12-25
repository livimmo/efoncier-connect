import { MapSettings } from "./types";

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
  lastPaymentDate: string | null;
  priceRange: [number, number];
  surfaceRange: [number, number];
  date?: string;
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

export interface MapViewProps {
  selectedParcel: any;
  markerPosition: { x: number; y: number } | null;
  onParcelSelect: (parcel: any, position?: { x: number; y: number }) => void;
  filteredParcels: any[];
  settings: MapSettings;
  mapInstance: google.maps.Map | null;
  setMapInstance: (map: google.maps.Map) => void;
  mapCenter: { lat: number; lng: number; zoom: number };
}