export interface Location {
  lat: number;
  lng: number;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  property_type: string;
  surface_area: number;
  location: Location;
  fiscal_status: "PAID" | "UNPAID" | "under_review";
  status: "AVAILABLE" | "IN_TRANSACTION" | "SOLD";
  is_for_sale: boolean;
  price: number;
  owner_id: string;
  created_at: string;
  updated_at: string;
  titleDeedNumber: string;
  ownerName?: string;
  zone?: string;
  type?: string;
  surface?: number;
  city?: string;
  address?: string;
  fiscalStatus?: "COMPLIANT" | "NON_COMPLIANT" | "UNDER_REVIEW";
  taxStatus: "PAID" | "UNPAID";
  tnbInfo: {
    pricePerMeter: number;
    totalAmount: number;
    status: 'LOW' | 'AVERAGE' | 'HIGH';
    lastUpdate: string;
  };
}