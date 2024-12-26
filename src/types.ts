export type PropertyType = 
  | "RESIDENTIAL" 
  | "COMMERCIAL" 
  | "INDUSTRIAL" 
  | "AGRICULTURAL" 
  | "MIXED" 
  | "SEASIDE"
  | "HOUSE"
  | "APARTMENT";

export type ZoneType = 
  | "E3" 
  | "E4" 
  | "BT2" 
  | "I2S12" 
  | "CONSTRUCTIBLE" 
  | "PROTECTED";

export type PropertyStatus = 
  | "AVAILABLE" 
  | "UNAVAILABLE" 
  | "IN_TRANSACTION" 
  | "SOLD" 
  | "DISPUTED";

export type TaxStatus = "PAID" | "PENDING" | "OVERDUE" | "LOW" | "AVERAGE" | "HIGH";

export interface MapFilters {
  region: string;
  city: string;
  commune: string;
  propertyType: string;
  propertyStatus: string;
  zoneType: string;
  size: [number, number];
  status: string;
  ownerName: string;
  titleDeedNumber: string;
  lastPaymentDate: Date | null;
  fiscalStatus: string;
  priceRange: [number, number];
  surfaceRange: [number, number];
  dateRange: [Date | null, Date | null];
}

export interface MapSettings {
  theme: "light" | "dark";
  unit: string;
  showLabels: boolean;
  showBoundaries: boolean;
  showTerrain: boolean;
  show3D: boolean;
  center: { lat: number; lng: number };
  zoom: number;
}

export interface Parcel {
  id: string;
  title: string;
  type: PropertyType;
  zone: ZoneType;
  surface: number;
  location: {
    lat: number;
    lng: number;
  };
  owner: {
    id: string;
    name: string;
    phone?: string;
    email?: string;
  };
  status: PropertyStatus;
  price: number;
  description: string;
  images: string[];
  documents: string[];
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean;
  phone?: string;
  email?: string;
}

export interface TNBInfo {
  id: string;
  parcelId: string;
  amount: number;
  status: TaxStatus;
  dueDate: string;
  paidDate?: string;
  lastUpdate: string;
}

export interface Region {
  id: string;
  name: string;
  center: {
    lat: number;
    lng: number;
  };
  cities: {
    name: string;
    communes: string[];
  }[];
  communes: string[];
}

export interface Transaction {
  id: string;
  parcelId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  status: string;
  date: string;
  documents: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  phone?: string;
  status: string;
}
