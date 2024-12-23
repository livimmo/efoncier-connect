export type PropertyType = 'INDUSTRIAL' | 'RESIDENTIAL' | 'SEASIDE' | 'AGRICULTURAL' | 'COMMERCIAL' | 'MIXED';
export type ZoneType = 'E4' | 'E3' | 'BT2' | 'I2S12' | 'PROTECTED' | 'CONSTRUCTIBLE';
export type ParcelStatus = 'FOR_SALE' | 'IN_DISPUTE' | 'IN_TRANSACTION' | 'UNAVAILABLE';
export type TaxStatus = 'PAID' | 'PENDING' | 'OVERDUE';

export interface Parcel {
  id: string;
  title: string;
  titleDeedNumber: string;
  ownerName: string;
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