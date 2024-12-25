import { UserRole } from "@/types/auth";

export interface MapSettings {
  theme: 'light' | 'dark';
  unit: 'metric' | 'imperial';
  showLabels: boolean;
  showBoundaries: boolean;
  showTerrain: boolean;
  show3D: boolean;
}

export interface MapFilters {
  region: string;
  commune: string;
  propertyType: string;
  zoneType: string;
  size: [number, number];
  status: string;
  ownerName: string;
  titleDeedNumber: string;
  lastPaymentDate: Date | null;
  fiscalStatus: string;
  maxPrice: number;
  tnbReference: string;
  searchQuery: string;
  zoning: string;
  paymentStatus: string;
  tnbStatus: string;
  propertyStatus: string;
}

export interface MapFiltersProps {
  onRegionChange: (regionId: string) => void;
  onCityChange: (cityName: string) => void;
  onDistrictChange: (districtName: string) => void;
  filters: MapFilters;
  setFilters: (filters: MapFilters) => void;
  onApplyFilters?: () => void;
  userRole?: UserRole;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  mapInstance: google.maps.Map | null;
}

export interface MapMobileControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLocate: () => void;
}