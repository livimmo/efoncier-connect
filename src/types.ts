export interface Location {
  lat: number;
  lng: number;
}

export interface TNBInfo {
  pricePerMeter: number;
  totalAmount: number;
  status: 'LOW' | 'AVERAGE' | 'HIGH';
  lastUpdate: string;
}

export type TaxStatus = "PAID" | "UNPAID" | "PENDING";
export type PropertyStatus = "AVAILABLE" | "IN_TRANSACTION" | "SOLD";
export type FiscalStatus = "PAID" | "UNPAID" | "under_review";
export type ZoneType = "URBAN" | "SUBURBAN" | "RURAL" | "E3" | "E4" | "I2S12" | "BT2" | "PROTECTED" | "CONSTRUCTIBLE";
export type PropertyType = 
  | "RESIDENTIAL"
  | "COMMERCIAL" 
  | "INDUSTRIAL"
  | "AGRICULTURAL"
  | "MIXED"
  | "SEASIDE"
  | "HOUSE"
  | "APARTMENT";

export interface BaseProperty {
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

export interface Property extends BaseProperty {
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

export interface ParcelInput extends BaseProperty {
  titleDeedNumber: string;
  ownerName: string;
  address: string;
  city: string;
  zone: ZoneType;
  type: PropertyType;
  surface: number;
  taxStatus: TaxStatus;
}

export interface Parcel extends ParcelInput {
  description?: string;
  phone?: string;
  email?: string;
  isFavorite?: boolean;
  tnbInfo: TNBInfo;
}