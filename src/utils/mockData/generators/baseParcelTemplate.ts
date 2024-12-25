import { Location, PropertyType, ZoneType, TaxStatus, PropertyStatus, FiscalStatus, TNBInfo } from '../../../types';

export interface BaseParcelTemplate {
  id: string;
  title: string;
  description: string;
  property_type: PropertyType;
  surface_area: number;
  location: Location;
  fiscal_status: FiscalStatus;
  status: PropertyStatus;
  is_for_sale: boolean;
  price: number;
  owner_id: string;
  created_at: string;
  updated_at: string;
  titleDeedNumber: string;
  ownerName: string;
  address: string;
  city: string;
  zone: string;
  type: string;
  surface: number;
  taxStatus: TaxStatus;
  tnbInfo: TNBInfo;
}

export const createBaseParcelTemplate = (): BaseParcelTemplate => ({
  id: '',
  title: '',
  description: '',
  property_type: 'RESIDENTIAL',
  surface_area: 0,
  location: { lat: 0, lng: 0 },
  fiscal_status: 'compliant',
  status: 'AVAILABLE',
  is_for_sale: false,
  price: 0,
  owner_id: '',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  titleDeedNumber: '',
  ownerName: '',
  address: '',
  city: '',
  zone: '',
  type: '',
  surface: 0,
  taxStatus: 'PAID',
  tnbInfo: {
    pricePerMeter: 0,
    totalAmount: 0,
    lastUpdate: new Date().toISOString(),
    status: 'PAID'
  }
});