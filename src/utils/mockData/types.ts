import { 
  PropertyType, 
  ZoneType, 
  TaxStatus, 
  PropertyStatus, 
  FiscalStatus, 
  Location, 
  TNBInfo,
  Parcel,
  Property,
  ParcelInput 
} from '../../types';

export type { 
  PropertyType, 
  ZoneType, 
  TaxStatus, 
  PropertyStatus, 
  FiscalStatus, 
  Location, 
  TNBInfo,
  Parcel,
  Property,
  ParcelInput 
};

export type TransactionType = "SALE" | "RENT" | "TAX_PAYMENT";

export interface Transaction {
  id: string;
  parcelId: string;
  type: TransactionType;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  amount: number;
  date: string;
  buyerId?: string;
  sellerId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  status: 'ACTIVE' | 'INACTIVE';
  phone: string;
  parcels: string[];
}