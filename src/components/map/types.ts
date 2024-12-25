export interface MapSettings {
  theme: 'light' | 'dark';
  unit: 'metric' | 'imperial';
  showLabels: boolean;
  showBoundaries: boolean;
  showTerrain: boolean;
  show3D: boolean;
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
}

export type PropertyType = 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL' | 'AGRICULTURAL' | 'MIXED' | 'SEASIDE' | 'HOUSE' | 'APARTMENT';

export interface MapMobileControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLocate: () => void;
}