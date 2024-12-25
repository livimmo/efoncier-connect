export type PropertyType = 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL' | 'AGRICULTURAL' | 'MIXED' | 'SEASIDE';
export type ZoneType = 'URBAN' | 'SUBURBAN' | 'RURAL' | 'E3' | 'E4' | 'I2S12' | 'BT2' | 'PROTECTED' | 'CONSTRUCTIBLE';
export type TaxStatus = 'PAID' | 'OVERDUE' | 'PENDING';
export type PropertyStatus = 'AVAILABLE' | 'UNAVAILABLE' | 'IN_TRANSACTION' | 'SOLD';
export type FiscalStatus = 'COMPLIANT' | 'NON_COMPLIANT' | 'UNDER_REVIEW';

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
  status: PropertyStatus;
  fiscalStatus: FiscalStatus;
  location: Location;
  ownerName: string;
  phone?: string;
  email?: string;
  price?: number;
  tnbInfo: TNBInfo;
}

export interface Transaction {
  id: string;
  parcelId: string;
  type: 'SALE' | 'RENT';
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  amount: number;
  date: string;
  buyerId: string;
  sellerId: string;
}