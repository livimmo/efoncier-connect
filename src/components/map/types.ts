import { PropertyType, ZoneType } from "@/utils/mockData/types";
import type { Parcel } from "@/utils/mockData/types";
import { UserRole } from "@/types/auth";

export interface MapFilters {
  region: string;
  commune: string;
  propertyType: PropertyType | '';
  zoneType: ZoneType | '';
  size: [number, number];
  status: 'PAID' | 'PENDING' | 'OVERDUE' | '';
  ownerName: string;
  titleDeedNumber: string;
  lastPaymentDate: string | null;
  fiscalStatus: 'compliant' | 'non_compliant' | '';
  maxPrice: number;
}

export interface MapFiltersProps {
  filters: MapFilters;
  setFilters: (filters: MapFilters) => void;
  onApplyFilters: () => void;
  className?: string;
  userRole: UserRole;
}
