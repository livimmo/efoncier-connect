export interface SearchFilters {
  minSurface: number;
  maxSurface: number;
  minPrice: number;
  maxPrice: number;
  city: string;
  district: string;
  propertyType: string;
  fiscalStatus: string;
  propertyStatus: string;
  year: string;
  titleDeedNumber: string;
}

export type PropertyStatus = "available" | "sold" | "unavailable";
export type FiscalStatus = "paid" | "unpaid" | "partial";

export interface FilterOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  color?: string;
}