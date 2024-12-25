import { Parcel, ParcelInput, FiscalStatus, TaxStatus } from '../../../types';
import { generateTNBInfo } from './tnbGenerator';

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

export const createParcelWithTNB = (data: Omit<ParcelInput, 'fiscal_status' | 'property_type' | 'surface_area' | 'is_for_sale' | 'price' | 'owner_id' | 'created_at' | 'updated_at'>): Parcel => ({
  ...data,
  property_type: data.type,
  surface_area: data.surface,
  fiscal_status: getFiscalStatus(data.taxStatus),
  is_for_sale: false,
  price: 0,
  owner_id: data.owner || '',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  tnbInfo: generateTNBInfo(data.surface, data.type)
});