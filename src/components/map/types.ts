import { UserRole } from "@/types/auth";

export interface MapFilters {
  region: string;
  commune: string;
  propertyType: PropertyType | "";
  zoneType: ZoneType | "";
  size: [number, number];
  status: Status | "";
  ownerName: string;
  titleDeedNumber: string;
  lastPaymentDate: string | null;
  fiscalStatus: FiscalStatus | "";
  maxPrice: number;
}

export type PropertyType = "RESIDENTIAL" | "COMMERCIAL" | "INDUSTRIAL" | "AGRICULTURAL" | "SEASIDE";
export type ZoneType = "URBAN" | "RURAL" | "INDUSTRIAL" | "COMMERCIAL";
export type Status = "PAID" | "PENDING" | "OVERDUE";
export type FiscalStatus = "compliant" | "non_compliant";

export interface MapSettings {
  theme: 'light' | 'dark';
  unit: 'metric' | 'imperial';
}

export interface MapMobileControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLocate: () => void;
}