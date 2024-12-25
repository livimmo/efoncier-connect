import { PropertyType, ZoneType, TaxStatus, PropertyStatus, Location, Parcel } from '../types';

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

export const createBaseParcel = (data: BaseParcelData): Partial<Parcel> => ({
  ...data,
  phone: undefined,
  email: undefined,
  price: undefined,
  fiscalStatus: data.taxStatus === 'PAID' ? 'COMPLIANT' : 
                data.taxStatus === 'OVERDUE' ? 'NON_COMPLIANT' : 
                'UNDER_REVIEW'
});