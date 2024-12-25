export type PropertyType = 
  | "RESIDENTIAL"
  | "COMMERCIAL" 
  | "INDUSTRIAL"
  | "AGRICULTURAL"
  | "SEASIDE"
  | "HOUSE"
  | "APARTMENT";

export type PropertyStatus = 
  | "AVAILABLE"
  | "UNAVAILABLE"
  | "IN_TRANSACTION"
  | "SOLD"
  | "DISPUTED";

export type TransactionType = 
  | "SALE"
  | "RENT"
  | "TAX_PAYMENT";

export interface ParcelInput {
  id: string;
  title: string;
  titleDeedNumber: string;
  address: string;
  description?: string;
  surface: number;
  type: PropertyType;
  status: PropertyStatus;
  location: {
    lat: number;
    lng: number;
  };
  price?: number;
  owner?: string;
  isFavorite?: boolean;
  fiscalStatus: "PAID" | "UNPAID" | "PARTIALLY_PAID";
}

export type Parcel = ParcelInput;