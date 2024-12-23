import { PropertyType, ZoneType } from "@/utils/mockData/types";

export interface MapFilters {
  city: string;
  owner: string;
  propertyType: PropertyType | '';
  zoneType: ZoneType | '';
  size: [number, number];
  status: 'PAID' | 'PENDING' | 'OVERDUE' | '';
}