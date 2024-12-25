import { Parcel, PropertyType, FiscalStatus } from '../types';
import { generateTNBInfo } from './tnbGenerator';
import { calculatePropertyPrice } from '../generators';

export type ParcelInput = Omit<Parcel, 'tnbInfo' | 'fiscalStatus' | 'price'>;

const getFiscalStatus = (taxStatus: string): FiscalStatus => {
  switch (taxStatus) {
    case 'PAID':
      return 'COMPLIANT';
    case 'OVERDUE':
      return 'NON_COMPLIANT';
    default:
      return 'UNDER_REVIEW';
  }
};

export const createParcelWithTNB = (data: ParcelInput): Parcel => ({
  ...data,
  fiscalStatus: getFiscalStatus(data.taxStatus),
  price: calculatePropertyPrice(data.type as PropertyType, data.surface),
  tnbInfo: generateTNBInfo(data.surface, data.type as PropertyType)
});