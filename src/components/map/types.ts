export interface Property {
  created_at: string;
  description: string;
  fiscal_status: "compliant" | "non_compliant" | "under_review";
  id: string;
  is_for_sale: boolean;
  location: any;
  owner_id: string;
  price: number;
  property_type: string;
  status: string;
  surface_area: number;
  title: string;
  updated_at: string;
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
  minPrice: number;
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
  userRole?: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  mapInstance: google.maps.Map | null;
}

export interface MapSettings {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  showLabels?: boolean;
  showBoundaries?: boolean;
  showTerrain?: boolean;
  show3D?: boolean;
  theme?: "light" | "dark";
  unit?: string;
}