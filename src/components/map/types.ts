import { UserRole } from "@/types/auth";
import { Parcel } from "@/utils/mockData/types";

export interface MapFilters {
  region: string;
  commune: string;
  propertyType: string;
  zoneType: string;
  size: [number, number];
  status: string;
  fiscalStatus: string;
  maxPrice: number;
  ownerName: string;
  titleDeedNumber: string;
  lastPaymentDate: Date | null;
}

export interface MapSettings {
  showLabels: boolean;
  showBoundaries: boolean;
  showTerrain: boolean;
  show3D: boolean;
}

export interface MapProps {
  parcels?: Parcel[];
  userRole?: UserRole;
  onParcelSelect?: (parcel: Parcel) => void;
}

export interface MobileFiltersSheetProps {
  filters: MapFilters;
  setFilters: React.Dispatch<React.SetStateAction<MapFilters>>;
  filteredParcelsCount: number;
  userRole: UserRole;
  onApplyFilters: () => void;
}

export interface MapMobileControlsProps {
  settings: MapSettings;
  onSettingChange: (key: keyof MapSettings) => void;
  onFilterClick: () => void;
  onLocateMe: () => void;
}