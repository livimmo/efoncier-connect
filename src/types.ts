export interface Location {
  lat: number;
  lng: number;
}

export type PropertyType = 
  | "RESIDENTIAL"
  | "COMMERCIAL"
  | "INDUSTRIAL"
  | "AGRICULTURAL"
  | "MIXED"
  | "SEASIDE";

export type PropertyStatus = 
  | "AVAILABLE"
  | "IN_TRANSACTION"
  | "SOLD";

export type TaxStatus = 
  | "PAID"
  | "UNPAID"
  | "PENDING";

export type FiscalStatus = 
  | "compliant"
  | "non_compliant"
  | "under_review";

export interface TNBInfo {
  pricePerMeter: number;
  totalAmount: number;
  lastUpdate: string;
  status: TaxStatus;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  property_type: PropertyType;
  surface_area: number;
  location: Location;
  fiscal_status: FiscalStatus;
  status: PropertyStatus;
  is_for_sale: boolean;
  price: number;
  owner_id: string;
  created_at: string;
  updated_at: string;
  titleDeedNumber: string;
  ownerName: string;
  address: string;
  city: string;
  zone: string;
  type: string;
  surface: number;
  taxStatus: TaxStatus;
  tnbInfo: TNBInfo;
}

export interface ParcelInput {
  id: string;
  title: string;
  description: string;
  property_type: PropertyType;
  surface_area: number;
  location: Location;
  fiscal_status: FiscalStatus;
  status: PropertyStatus;
  is_for_sale: boolean;
  price: number;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface Parcel extends ParcelInput {
  description?: string;
  titleDeedNumber: string;
  ownerName: string;
  address: string;
  city: string;
  zone: string;
  type: string;
  surface: number;
  taxStatus: TaxStatus;
  tnbInfo: TNBInfo;
}