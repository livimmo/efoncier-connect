export type PropertyType = 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL' | 'AGRICULTURAL' | 'MIXED' | 'SEASIDE';
export type ZoneType = 'URBAN' | 'SUBURBAN' | 'RURAL' | 'E3' | 'E4' | 'I2S12' | 'BT2' | 'PROTECTED' | 'CONSTRUCTIBLE';
export type TaxStatus = 'PAID' | 'PENDING' | 'OVERDUE';
export type TNBStatus = 'LOW' | 'AVERAGE' | 'HIGH';

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