import { residentialParcels } from './residential';
import { commercialParcels } from './commercial';
import { Parcel } from '../types';

export const mockParcels: Parcel[] = [
  ...residentialParcels,
  ...commercialParcels,
];