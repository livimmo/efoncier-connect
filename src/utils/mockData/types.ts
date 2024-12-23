export interface Parcel {
  id: string;
  title: string;
  location: {
    lat: number;
    lng: number;
  };
  surface: number;
  type: 'INDUSTRIAL' | 'RESIDENTIAL' | 'SEASIDE' | 'AGRICULTURAL' | 'COMMERCIAL' | 'MIXED';
  zone: 'E4' | 'E3' | 'BT2' | 'I2S12' | 'PROTECTED' | 'CONSTRUCTIBLE';
  owner: string;
  status: 'FOR_SALE' | 'OCCUPIED' | 'AVAILABLE';
  price?: number;
  city: string;
  address: string;
  taxStatus: 'PAID' | 'PENDING' | 'OVERDUE';
  lastPaymentDate?: string;
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