import { Property, ParcelInput, FiscalStatus, TaxStatus, PropertyType, ZoneType } from '../../../types';
import { generateTNBInfo } from './tnbGenerator';

const getFiscalStatus = (taxStatus: TaxStatus): FiscalStatus => {
  if (taxStatus === 'PAID') {
    return 'compliant';
  } else if (taxStatus === 'PENDING') {
    return 'under_review';
  }
  return 'non_compliant';
};

export const createParcelWithTNB = (input: Partial<Property>): Property => {
  const taxStatus: TaxStatus = input.taxStatus || 'PENDING';
  const fiscal_status = getFiscalStatus(taxStatus);
  const surface_area = input.surface || 0;
  const property_type = input.type || 'RESIDENTIAL';
  
  const baseParcel: Property = {
    id: input.id || crypto.randomUUID(),
    title: input.title || '',
    description: input.description || '',
    property_type,
    surface_area,
    location: input.location || { lat: 0, lng: 0 },
    fiscal_status,
    status: input.status || 'AVAILABLE',
    is_for_sale: false,
    price: input.price || 0,
    owner_id: input.owner_id || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    titleDeedNumber: input.titleDeedNumber || '',
    ownerName: input.ownerName || '',
    address: input.address || '',
    city: input.city || '',
    zone: input.zone || 'RESIDENTIAL_ZONE',
    type: property_type,
    surface: surface_area,
    taxStatus,
    tnbInfo: generateTNBInfo(surface_area, property_type)
  };

  return baseParcel;
};