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
}