import { PropertyType, ZoneType, TaxStatus, PropertyStatus, Location } from '../types';

export interface BaseParcelData {
  id: string;
  title: string;
  address: string;
  city: string;
  surface: number;
  type: PropertyType;
  zone: ZoneType;
  taxStatus: TaxStatus;
  status: PropertyStatus;
  owner: string;
  location: Location;
  titleDeedNumber: string;
  ownerName: string;
}

export const createBaseParcel = (data: BaseParcelData) => ({
  ...data,
  phone: undefined,
  email: undefined,
  price: undefined,
  status: data.status || 'AVAILABLE'
});