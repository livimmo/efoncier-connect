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
  'SOLD',
  'PENDING',
  'APPROVED',
  'REJECTED',
  'ARCHIVED',
  'DISPUTED'
];

export const TAX_STATUSES: TaxStatus[] = [
  'PAID',
  'PENDING',
  'UNPAID',
  'OVERDUE',
  'LOW',
  'AVERAGE'
];

export const ZONE_TYPES_ARRAY: ZoneType[] = [
  'RESIDENTIAL_ZONE',
  'COMMERCIAL_ZONE',
  'INDUSTRIAL_ZONE',
  'AGRICULTURAL_ZONE',
  'MIXED_USE_ZONE',
  'PROTECTED_ZONE',
  'CONSTRUCTIBLE_ZONE',
  'URBAN'
];