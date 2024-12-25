import { BaseParcelData, createBaseParcel } from './baseParcelTemplate';
import { generateTNBInfo } from './tnbGenerator';
import { Parcel } from '../types';

export const createParcelWithTNB = (data: BaseParcelData): Parcel => {
  const baseParcel = createBaseParcel(data);
  const tnbInfo = generateTNBInfo(data.surface, data.type);

  return {
    ...baseParcel,
    tnbInfo,
    id: data.id,
    title: data.title,
    description: data.description || '',
    surface_area: data.surface,
    property_type: data.type,
    status: data.status,
    fiscal_status: data.taxStatus === 'PAID' ? 'compliant' : 
                  data.taxStatus === 'OVERDUE' ? 'non_compliant' : 
                  'under_review',
    is_for_sale: true,
    price: data.price || 0,
    owner_id: data.owner,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    location: data.location
  } as Parcel;
};