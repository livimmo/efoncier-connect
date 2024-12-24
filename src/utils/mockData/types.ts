export type PropertyType = 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL' | 'AGRICULTURAL' | 'MIXED' | 'SEASIDE';
export type ZoneType = 'URBAN' | 'SUBURBAN' | 'RURAL' | 'E3' | 'E4' | 'I2S12' | 'BT2' | 'PROTECTED' | 'CONSTRUCTIBLE';
export type TaxStatus = 'PAID' | 'PENDING' | 'OVERDUE';

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
  owner: string; // Added this field
  phone?: string;
  email?: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: string;
  type: string;
  parcelId: string;
  buyerId?: string; // Added optional buyerId
  sellerId?: string; // Added optional sellerId
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  phone?: string; // Added optional phone
  parcels?: string[]; // Added optional parcels array
}