export type PropertyType = 'INDUSTRIAL' | 'RESIDENTIAL' | 'COMMERCIAL' | 'AGRICULTURAL' | 'MIXED';
export type ZoneType = 'E4' | 'E3' | 'BT2' | 'I2S12' | 'PROTECTED' | 'CONSTRUCTIBLE';
export type TaxStatus = 'PAID' | 'PENDING' | 'OVERDUE';
export type Availability = 'AVAILABLE' | 'PENDING' | 'DISPUTED' | 'UNAVAILABLE';

export interface Parcel {
  id: string;
  title: string;
  address: string;
  city: string;
  surface: number;
  type: PropertyType;
  zone: ZoneType;
  taxStatus: TaxStatus;
  owner: string;
  location: {
    lat: number;
    lng: number;
  };
  titleDeedNumber: string;
  ownerName: string;
  price: number;
  availability: Availability;
  bank: string | null;
}