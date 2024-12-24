export type PropertyType = 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL' | 'AGRICULTURAL' | 'MIXED' | 'SEASIDE';
export type ZoneType = 'URBAN' | 'SUBURBAN' | 'RURAL' | 'E3' | 'E4' | 'I2S12' | 'BT2' | 'PROTECTED' | 'CONSTRUCTIBLE';
export type TaxStatus = 'PAID' | 'PENDING' | 'OVERDUE';
export type TNBStatus = 'LOW' | 'AVERAGE' | 'HIGH';
export type PropertyStatus = 'AVAILABLE' | 'DISPUTED' | 'UNAVAILABLE' | 'IN_TRANSACTION';
export type FiscalStatus = 'PAID' | 'UNPAID' | 'PARTIALLY_PAID';

export interface TNBInfo {
  pricePerMeter: number;
  totalAmount: number;
  lastUpdate: string;
  status: TNBStatus;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Parcel {
  id: string;
  title: string;
  titleDeedNumber: string;
  address: string;
  city: string;
  surface: number;
  type: PropertyType;
  zone: ZoneType;
  taxStatus: TaxStatus;
  ownerName: string;
  owner: string;
  phone?: string;
  email?: string;
  location: Location;
  tnbInfo: TNBInfo;
  price?: number; // Added price as an optional property
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: string;
  type: string;
  parcelId: string;
  buyerId?: string;
  sellerId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  phone?: string;
  parcels?: string[];
}

export interface Property {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  property_type: string;
  surface_area: number;
  location: {
    lat: number;
    lng: number;
  };
  fiscal_status: 'compliant' | 'non_compliant' | 'under_review';
  status: 'pending' | 'approved' | 'rejected';
  is_for_sale: boolean;
  price?: number;
  created_at: string;
  updated_at: string;
}
