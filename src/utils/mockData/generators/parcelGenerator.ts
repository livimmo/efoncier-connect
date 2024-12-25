import { Parcel, PropertyType, FiscalStatus } from '../types';
import { generateTNBInfo } from './tnbGenerator';

type ParcelInput = Omit<Parcel, 'tnbInfo' | 'fiscalStatus'> & {
  taxStatus: string;
};

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
  tnbInfo: generateTNBInfo(data.surface, data.type)
});