export interface Property {
  created_at: string;
  description: string;
  fiscal_status: "compliant" | "non_compliant" | "under_review";
  id: string;
  is_for_sale: boolean;
  location: any;
  owner_id: string;
  price: number;
  property_type: string;
  status: "AVAILABLE" | "IN_TRANSACTION" | "SOLD";
  surface_area: number;
  title: string;
  updated_at: string;
  taxStatus?: 'PAID' | 'UNPAID';
  tnbInfo?: {
    totalAmount: number;
    pricePerMeter: number;
    lastUpdate: string;
  };
}