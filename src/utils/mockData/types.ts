export type PropertyType = 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL' | 'AGRICULTURAL' | 'MIXED' | 'SEASIDE' | 'HOUSE' | 'APARTMENT';

export type ZoneType = 'URBAN' | 'SUBURBAN' | 'RURAL' | 'E3' | 'E4' | 'I2S12' | 'BT2' | 'PROTECTED' | 'CONSTRUCTIBLE';
export type TaxStatus = 'PAID' | 'PENDING' | 'OVERDUE';

export interface Location {
  lat: number;
  lng: number;
  address?: string;
  city?: string;
  zone?: ZoneType;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  phone: string;
  parcels: string[];
}