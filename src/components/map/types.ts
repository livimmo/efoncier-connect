import { PropertyType, ZoneType } from "@/utils/mockData/types";

export interface FilterValue {
  value: string;
  label: string;
}

export interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface DateFilterProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export interface SelectFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterValue[];
  placeholder: string;
}

export interface RangeFilterProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}

export interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  type: "owner" | "title";
  placeholder: string;
}

export interface PropertyFiltersProps {
  filters: MapFilters;
  setFilters: (filters: MapFilters) => void;
  onFilterChange: (filterType: string, value: string) => void;
}

export interface PaymentFiltersProps {
  filters: MapFilters;
  setFilters: (filters: MapFilters) => void;
  userRole?: string;
  onFilterChange: (filterType: string, value: string) => void;
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
}
