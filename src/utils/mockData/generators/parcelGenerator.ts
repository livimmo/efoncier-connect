import { Parcel, PropertyType, FiscalStatus } from '../types';
import { generateTNBInfo } from './tnbGenerator';
import { getCityRegion } from '../helpers/regionMapper';

export type ParcelInput = Omit<Parcel, 'tnbInfo' | 'fiscalStatus'>;

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

export const createParcelWithTNB = (data: Omit<ParcelInput, 'region'>): Parcel => {
  const region = getCityRegion(data.city);
  
  return {
    ...data,
    region,
    fiscalStatus: getFiscalStatus(data.taxStatus),
    tnbInfo: generateTNBInfo(data.surface, data.type as PropertyType)
  };
};