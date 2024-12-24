import { residentialParcels } from './parcels/residential';
import { commercialParcels } from './parcels/commercial';
import { industrialParcels } from './parcels/industrial';
import { agriculturalParcels } from './parcels/agricultural';
import { mixedParcels } from './parcels/mixed';
import { seasideParcels } from './parcels/seaside';
import { tangerParcels } from './parcels/tanger';
import { agadirParcels } from './parcels/agadir';
import { marrakechParcels } from './parcels/marrakech';
import { beniMellalParcels } from './parcels/benimellal';
import { meknesParcels } from './parcels/meknes';

export const mockParcels = [
  ...residentialParcels,
  ...commercialParcels,
  ...industrialParcels,
  ...agriculturalParcels,
  ...mixedParcels,
  ...seasideParcels,
  ...tangerParcels,
  ...agadirParcels,
  ...marrakechParcels,
  ...beniMellalParcels,
  ...meknesParcels
];