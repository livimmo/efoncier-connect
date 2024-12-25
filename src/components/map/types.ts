import { UserRole } from "@/types/auth";
import { Parcel } from "@/utils/mockData/types";

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
}

export interface MapSettings {
  showLabels: boolean;
  showBoundaries: boolean;
  showTerrain: boolean;
  show3D: boolean;
  theme: 'light' | 'dark';
  unit: 'metric' | 'imperial';
}

export interface MapMobileControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLocate: () => void;
}

export interface MapProps {
  parcels?: Parcel[];
  userRole?: UserRole;
  onParcelSelect?: (parcel: Parcel) => void;
}