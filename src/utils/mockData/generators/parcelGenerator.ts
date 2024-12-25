import { Property, TaxStatus, FiscalStatus, PropertyType, ZoneType } from '../../../types';
import { generateTNBInfo } from './tnbGenerator';

const getFiscalStatus = (taxStatus: TaxStatus): FiscalStatus => {
  return taxStatus === 'PAID' ? 'compliant' : 'under_review';
};

const getZoneType = (propertyType: PropertyType): ZoneType => {
  switch (propertyType) {
    case 'RESIDENTIAL':
      return 'RESIDENTIAL_ZONE';
    case 'COMMERCIAL':
      return 'COMMERCIAL_ZONE';
    case 'INDUSTRIAL':
      return 'INDUSTRIAL_ZONE';
    case 'AGRICULTURAL':
      return 'AGRICULTURAL_ZONE';
    case 'MIXED':
      return 'MIXED_USE_ZONE';
    case 'SEASIDE':
      return 'CONSTRUCTIBLE_ZONE';
    default:
      return 'CONSTRUCTIBLE_ZONE';
  }
};

export const createParcelWithTNB = (input: Partial<Property>): Property => {
  const taxStatus: TaxStatus = input.taxStatus || 'PENDING';
  const fiscal_status = getFiscalStatus(taxStatus);
  const surface_area = input.surface || 0;
  const property_type = input.type || 'RESIDENTIAL';
  const zone = getZoneType(property_type);
  const status: PropertyStatus = input.status || 'AVAILABLE';
  
  const baseParcel: Property = {
    id: input.id || crypto.randomUUID(),
    title: input.title || '',
    description: input.description || '',
    property_type,
    surface_area,
    location: input.location || { lat: 0, lng: 0 },
    fiscal_status,
    status,
    is_for_sale: input.is_for_sale || false,
    price: input.price || 0,
    owner_id: input.owner_id || '',
    created_at: input.created_at || new Date().toISOString(),
    updated_at: input.updated_at || new Date().toISOString(),
    titleDeedNumber: input.titleDeedNumber || '',
    ownerName: input.ownerName || '',
    address: input.address || '',
    city: input.city || '',
    zone,
    type: property_type,
    surface: surface_area,
    taxStatus,
    tnbInfo: generateTNBInfo(surface_area, property_type)
  };

  return baseParcel;
};