import { Parcel, PropertyType, FiscalStatus, PropertyStatus } from '../types';
import { generateTNBInfo } from './tnbGenerator';

type ParcelInput = Omit<Parcel, 'tnbInfo'>;

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

const getPropertyStatus = (taxStatus: string): PropertyStatus => {
  switch (taxStatus) {
    case 'PAID':
      return 'AVAILABLE';
    case 'OVERDUE':
      return 'DISPUTED';
    default:
      return 'PENDING';
  }
};

export const createParcelWithTNB = (data: Omit<ParcelInput, 'fiscalStatus' | 'status'> & { taxStatus: string }): Parcel => ({
  ...data,
  fiscalStatus: getFiscalStatus(data.taxStatus),
  status: getPropertyStatus(data.taxStatus),
  tnbInfo: generateTNBInfo(data.surface, data.type)
});