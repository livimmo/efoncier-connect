import { Parcel, PropertyType } from '../types';
import { generateTNBInfo } from './tnbGenerator';

type ParcelInput = Omit<Parcel, 'tnbInfo' | 'status'> & { status?: Parcel['status'] };

export const createParcelWithTNB = (data: ParcelInput): Parcel => ({
  ...data,
  status: data.status || 'AVAILABLE',
  tnbInfo: generateTNBInfo(data.surface, data.type)
});