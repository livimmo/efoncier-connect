import { Property, ParcelInput, FiscalStatus, TaxStatus, PropertyType, ZoneType } from '../../../types';
import { generateTNBInfo } from './tnbGenerator';

const getFiscalStatus = (taxStatus: TaxStatus): FiscalStatus => {
  switch (taxStatus) {
    case 'PAID':
      return 'compliant';
    case 'UNPAID':
      return 'non_compliant';
    default:
      return 'under_review';
  }
};

export const createParcelWithTNB = (data: Partial<Property>): Property => {
  const baseProperty: Property = {
    id: data.id || '',
    title: data.title || '',
    description: data.description || '',
    property_type: data.property_type || 'RESIDENTIAL',
    surface_area: data.surface_area || 0,
    location: data.location || { lat: 0, lng: 0 },
    fiscal_status: getFiscalStatus(data.taxStatus || 'PENDING'),
    status: data.status || 'AVAILABLE',
    is_for_sale: false,
    price: data.price || 0,
    owner_id: data.owner_id || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    titleDeedNumber: data.titleDeedNumber || '',
    ownerName: data.ownerName || '',
    address: data.address || '',
    city: data.city || '',
    zone: data.zone || 'RESIDENTIAL',
    type: data.type || 'RESIDENTIAL',
    surface: data.surface || 0,
    taxStatus: data.taxStatus || 'PENDING',
    tnbInfo: data.tnbInfo || generateTNBInfo(data.surface || 0, data.type || 'RESIDENTIAL'),
    phone: data.phone,
    email: data.email
  };

  return baseProperty;
};