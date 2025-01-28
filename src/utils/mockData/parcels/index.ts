import { residentialParcels } from './residential';
import { commercialParcels } from './commercial';
import { industrialParcels } from './industrial';
import { generateRandomParcels } from '../generators/randomParcels';
import { Parcel } from '../types';

// Combine les parcelles fixes avec les parcelles générées aléatoirement
const fixedParcels: Parcel[] = [
  ...residentialParcels,
  ...commercialParcels,
  ...industrialParcels,
];

// Génère des parcelles aléatoires et les combine avec les parcelles fixes
export const mockParcels: Parcel[] = [
  ...fixedParcels,
  ...generateRandomParcels()
];