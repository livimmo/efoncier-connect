import { Parcel } from '../types';
import { generateTNBInfo } from './tnbGenerator';

export const createParcelWithTNB = (data: Omit<Parcel, 'tnbInfo'>): Parcel => ({
  ...data,
  tnbInfo: generateTNBInfo(data.surface, data.type)
});