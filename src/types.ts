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
  status: string;
  surface_area: number;
  title: string;
  updated_at: string;
  zoning?: "E4" | "E2" | "I2S1" | "BT2" | "D1" | "D4" | "D2";
  tnbInfo?: {
    status: "PAID" | "LOW" | "AVERAGE" | "HIGH";
    pricePerMeter: number;
    totalAmount: number;
    lastUpdate: string;
  };
}