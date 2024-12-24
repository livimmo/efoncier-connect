export type PropertyType = 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL' | 'AGRICULTURAL';
export type ZoneType = 'URBAN' | 'SUBURBAN' | 'RURAL';
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
  phone: string;
  email: string;
  position: {
    lat: number;
    lng: number;
  };
}