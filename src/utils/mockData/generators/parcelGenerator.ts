import { Property, TNBInfo, Location, PropertyType, ZoneType, TaxStatus, PropertyStatus } from '@/types';

interface ParcelGeneratorInput {
  id: string;
  title: string;
  address: string;
  city: string;
  surface: number;
  type: PropertyType;
  zone: ZoneType;
  taxStatus: TaxStatus;
  status: PropertyStatus;
  ownerName: string;
  location: Location;
  titleDeedNumber: string;
  description?: string;
  price?: number;
}

export const createParcelWithTNB = (input: ParcelGeneratorInput): Property => {
  const tnbInfo: TNBInfo = {
    pricePerMeter: Math.floor(Math.random() * 100) + 50,
    totalAmount: input.surface * (Math.floor(Math.random() * 100) + 50),
    lastUpdate: new Date().toISOString(),
    status: input.taxStatus
  };

  return {
    id: input.id,
    title: input.title,
    description: input.description || '',
    property_type: input.type,
    surface_area: input.surface,
    location: input.location,
    fiscal_status: 'compliant',
    status: input.status,
    is_for_sale: Math.random() > 0.5,
    price: input.price || input.surface * 1000,
    owner_id: `owner-${input.id}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    titleDeedNumber: input.titleDeedNumber,
    ownerName: input.ownerName,
    address: input.address,
    city: input.city,
    zone: input.zone,
    type: input.type,
    surface: input.surface,
    taxStatus: input.taxStatus,
    tnbInfo: tnbInfo
  };
};