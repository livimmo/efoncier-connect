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
  lastPaymentDate: Date | null;
  priceRange: [number, number];
  surfaceRange: [number, number];
  date?: Date;
}

export interface MobileFiltersSheetProps {
  filters: MapFilters;
  setFilters: (filters: MapFilters) => void;
  filteredParcelsCount: number;
}