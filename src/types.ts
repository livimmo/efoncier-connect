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
  | "SOLD"
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "ARCHIVED";

export type TaxStatus = 
  | "PAID"
  | "PENDING"
  | "UNPAID"
  | "OVERDUE"
  | "LOW"
  | "AVERAGE";

export type FiscalStatus = 
  | "compliant"
  | "non_compliant"
  | "under_review";

export type ZoneType =
  | "RESIDENTIAL_ZONE"
  | "COMMERCIAL_ZONE"
  | "INDUSTRIAL_ZONE"
  | "AGRICULTURAL_ZONE"
  | "MIXED_USE_ZONE"
  | "PROTECTED_ZONE"
  | "CONSTRUCTIBLE_ZONE"
  | "URBAN"
  | "E3"
  | "E4"
  | "BT2"
  | "I2S12";

export interface TNBInfo {
  pricePerMeter: number;
  totalAmount: number;
  lastUpdate: string;
  status: TaxStatus;
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

export interface Property extends ParcelInput {
  titleDeedNumber: string;
  ownerName: string;
  address: string;
  city: string;
  zone: ZoneType;
  type: PropertyType;
  surface: number;
  taxStatus: TaxStatus;
  tnbInfo: TNBInfo;
  phone?: string;
  email?: string;
}

export interface Parcel extends Property {
  isFavorite?: boolean;
  owner?: string;
}