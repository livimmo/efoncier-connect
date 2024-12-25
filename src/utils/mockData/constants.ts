import { ZoneType, PropertyType, PropertyStatus, TaxStatus } from '../../types';

export const ZONE_TYPES: Record<PropertyType, ZoneType> = {
  RESIDENTIAL: 'RESIDENTIAL_ZONE',
  COMMERCIAL: 'COMMERCIAL_ZONE',
  INDUSTRIAL: 'INDUSTRIAL_ZONE',
  AGRICULTURAL: 'AGRICULTURAL_ZONE',
  MIXED: 'MIXED_USE_ZONE',
  SEASIDE: 'CONSTRUCTIBLE_ZONE'
};

export const PROPERTY_TYPES: PropertyType[] = [
  'RESIDENTIAL',
  'COMMERCIAL',
  'INDUSTRIAL',
  'AGRICULTURAL',
  'MIXED',
  'SEASIDE'
];

export const PROPERTY_STATUSES: PropertyStatus[] = [
  'AVAILABLE',
  'IN_TRANSACTION',
  'SOLD'
];

export const TAX_STATUSES: TaxStatus[] = [
  'PAID',
  'PENDING'
];