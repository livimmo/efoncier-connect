export type PropertyType = 'INDUSTRIAL' | 'RESIDENTIAL' | 'SEASIDE' | 'AGRICULTURAL' | 'COMMERCIAL' | 'MIXED';
export type ZoneType = 'E4' | 'E3' | 'BT2' | 'I2S12' | 'PROTECTED' | 'CONSTRUCTIBLE';
export type ParcelStatus = 'FOR_SALE' | 'IN_DISPUTE' | 'IN_TRANSACTION' | 'UNAVAILABLE';
export type TaxStatus = 'PAID' | 'PENDING' | 'OVERDUE';
export type UserRole = 'TAXPAYER' | 'DEVELOPER' | 'ADMIN';

export interface Parcel {
  id: string;
  title: string;
  titleDeedNumber: string;
  ownerName: string;
  owner: string; // Ajout de la propriété owner
  address: string;
  city: string;
  district: string;
  surface: number;
  type: PropertyType;
  zone: ZoneType;
  price?: number;
  taxStatus: TaxStatus;
  status: ParcelStatus;
  bank?: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface MapFilters {
  city: string;
  district: string;
  propertyType: PropertyType | '';
  zoneType: ZoneType | '';
  size: [number, number];
  status: ParcelStatus | '';
  taxStatus: TaxStatus | '';
  priceRange: [number, number];
  titleDeedNumber: string;
}

export interface Transaction {
  id: string;
  parcelId: string;
  amount: number;
  date: string;
  type: 'TAX_PAYMENT' | 'SALE';
  status: 'COMPLETED' | 'PENDING';
  buyerId?: string;
  sellerId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  parcels?: string[];
}