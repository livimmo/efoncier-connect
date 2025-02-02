export interface Location {
  id: string;
  name: string;
  center: {
    lat: number;
    lng: number;
  };
  cities: City[];
}

export interface City {
  name: string;
  communes: string[];
}

export type PropertyType = 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL' | 'AGRICULTURAL';
export type ZoneType = 'E3' | 'E4' | 'SD1' | 'BT2' | 'I2S12';
export type TaxStatus = 'PAID' | 'PENDING' | 'OVERDUE';
export type PropertyStatus = 'AVAILABLE' | 'UNAVAILABLE' | 'IN_TRANSACTION';
export type FiscalStatus = 'COMPLIANT' | 'NON_COMPLIANT' | 'UNDER_REVIEW';

export interface TNBInfo {
  pricePerMeter: number;
  totalAmount: number;
  lastPaymentDate?: string;
  status: TaxStatus;
}

export interface ParcelInput {
  id: string;
  title: string;
  type: PropertyType;
  surface: number;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  owner: string;
  status: PropertyStatus;
  taxStatus: TaxStatus;
  zone: ZoneType;
  city: string;
  titleDeedNumber: string;
  ownerName: string;
}

export interface Parcel extends ParcelInput {
  price: number;
  fiscalStatus: FiscalStatus;
  tnbInfo: TNBInfo;
}

export interface Transaction {
  id: string;
  parcelId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  status: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  properties: string[];
}