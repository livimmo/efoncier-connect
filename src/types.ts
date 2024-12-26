export interface Property {
  id: string;
  title: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  price: number;
  type: PropertyType;
  status: PropertyStatus;
  zone: ZoneType;
  surface: number;
  owner: string;
  titleDeedNumber: string;
  ownerName: string;
  fiscalStatus: FiscalStatus;
  taxStatus: TaxStatus;
  phone?: string;
  email?: string;
  isFavorite?: boolean;
  property_type?: string;
  surface_area?: number;
  fiscal_status?: string;
  description?: string;
  is_for_sale?: boolean;
  owner_id?: string;
  created_at?: string;
  updated_at?: string;
  city?: string;
  address?: string;
  tnbInfo: TNBInfo;
}

export interface PaymentDetails {
  id: string;
  location: string;
  area: number;
  type: string;
  amount: number;
  dueDate: string;
  status: "paid" | "unpaid" | "pending";
}

export interface PaymentProps {
  parcelId?: string;
  hideHeader?: boolean;
}

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
  | "SD1" 
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

export type FiscalStatus = 
  | "COMPLIANT" 
  | "NON_COMPLIANT" 
  | "UNDER_REVIEW";

export type TaxStatus = 
  | "PAID" 
  | "PENDING" 
  | "OVERDUE" 
  | "LOW" 
  | "AVERAGE" 
  | "HIGH";

export interface TNBInfo {
  pricePerMeter: number;
  totalAmount: number;
  lastPaymentDate?: string;
  lastUpdate: string;
  status: TaxStatus;
}

export interface MapFilters {
  region: string;
  commune: string;
  city: string;
  propertyType: string;
  zoneType: string;
  size: [number, number];
  status: string;
  ownerName: string;
  titleDeedNumber: string;
  lastPaymentDate: Date | null;
  fiscalStatus: string;
  maxPrice: number;
  minPrice: number;
  tnbReference: string;
  searchQuery: string;
  zoning: string;
  paymentStatus: string;
  tnbStatus: string;
  propertyStatus: string;
}

export interface MapSettings {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  theme?: "light" | "dark";
  unit?: string;
  showLabels?: boolean;
  showBoundaries?: boolean;
  showTerrain?: boolean;
  show3D?: boolean;
}

export interface Transaction {
  id: string;
  parcelId: string;
  buyerId?: string;
  sellerId?: string;
  amount: number;
  status: string;
  date: string;
  type: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  properties: string[];
  phone?: string;
  status: string;
}

export interface Region {
  id: string;
  name: string;
  center: {
    lat: number;
    lng: number;
  };
  cities: City[];
  communes: string[];
}

export interface City {
  name: string;
  communes: string[];
}