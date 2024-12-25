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

export interface Property {
  id: string;
  title: string;
  description: string;
  property_type: string;
  surface_area: number;
  location: Location;
  fiscal_status: "PAID" | "UNPAID" | "under_review";
  status: "AVAILABLE" | "IN_TRANSACTION" | "SOLD";
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
  taxStatus: "PAID" | "UNPAID";
  tnbInfo: TNBInfo;
}

export type PropertyStatus = "AVAILABLE" | "IN_TRANSACTION" | "SOLD";
export type FiscalStatus = "PAID" | "UNPAID" | "under_review";