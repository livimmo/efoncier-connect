import { residentialParcels } from './parcels/residential';
import { commercialParcels } from './parcels/commercial';
import { industrialParcels } from './parcels/industrial';
import { agriculturalParcels } from './parcels/agricultural';
import { mixedParcels } from './parcels/mixed';
import { seasideParcels } from './parcels/seaside';

export const mockParcels = [
  ...residentialParcels,
  ...commercialParcels,
  ...industrialParcels,
  ...agriculturalParcels,
  ...mixedParcels,
  ...seasideParcels
];