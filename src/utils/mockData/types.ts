export type PropertyType = 'INDUSTRIAL' | 'RESIDENTIAL' | 'SEASIDE' | 'AGRICULTURAL' | 'COMMERCIAL' | 'MIXED';

export type ZoneType = 'E4' | 'E3' | 'BT2' | 'I2S12' | 'PROTECTED' | 'CONSTRUCTIBLE';

export interface Parcel {
  id: string;
  title: string;
  address: string;
  city: string;
  surface: number;
  type: PropertyType;
  zone: ZoneType;
  taxStatus: 'PAID' | 'PENDING' | 'OVERDUE';
  owner: string;
  location: {
    lat: number;
    lng: number;
  };
  titleDeedNumber: string;
  ownerName: string;
  price?: number;
  availability?: 'AVAILABLE' | 'PENDING' | 'SOLD';
}

export interface MapFilters {
  city: string;
  owner: string;
  propertyType: PropertyType | '';
  zoneType: ZoneType | '';
  size: [number, number];
  status: 'PAID' | 'PENDING' | 'OVERDUE' | '';
  price?: [number, number];
  availability?: 'AVAILABLE' | 'PENDING' | 'SOLD' | '';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'TAXPAYER' | 'DEVELOPER' | 'ADMIN';
  phone: string;
  parcels?: string[];
}

export interface Transaction {
  id: string;
  parcelId: string;
  amount: number;
  date: string;
  type: 'TAX_PAYMENT' | 'SALE' | 'PURCHASE';
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  buyerId?: string;
  sellerId?: string;
}