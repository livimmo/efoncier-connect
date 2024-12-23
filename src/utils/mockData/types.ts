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
}