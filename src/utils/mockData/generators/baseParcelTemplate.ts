import { PropertyType, ZoneType, TaxStatus, PropertyStatus, Location, Parcel, FiscalStatus } from '../../../types';

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

const getFiscalStatus = (taxStatus: TaxStatus): FiscalStatus => {
  switch (taxStatus) {
    case 'PAID':
      return 'PAID';
    case 'UNPAID':
      return 'UNPAID';
    default:
      return 'under_review';
  }
};

export const createBaseParcel = (data: BaseParcelData): Partial<Parcel> => ({
  ...data,
  property_type: data.type,
  surface_area: data.surface,
  fiscal_status: getFiscalStatus(data.taxStatus),
  is_for_sale: false,
  price: 0,
  owner_id: data.owner,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});