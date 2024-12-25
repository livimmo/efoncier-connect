import { UserRole } from "@/types/auth";
import { PropertyType, ZoneType, Status, FiscalStatus } from "@/utils/mockData/types";

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

export interface MapMobileControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLocate: () => void;
}

export interface MapFiltersProps {
  filters: MapFilters;
  setFilters: React.Dispatch<React.SetStateAction<MapFilters>>;
  onApplyFilters: () => void;
  userRole: UserRole;
}