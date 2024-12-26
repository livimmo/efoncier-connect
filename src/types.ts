export interface Property {
  id: string;
  title: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  price: number;
  type: "RESIDENTIAL" | "COMMERCIAL" | "INDUSTRIAL" | "AGRICULTURAL";
  status: "AVAILABLE" | "UNAVAILABLE" | "IN_TRANSACTION";
  zone: "E3" | "E4" | "SD1" | "BT2" | "I2S12";
  surface: number;
  owner: string;
  titleDeedNumber: string;
  ownerName: string;
  fiscalStatus: "COMPLIANT" | "NON_COMPLIANT" | "UNDER_REVIEW";
  taxStatus: "PAID" | "PENDING" | "OVERDUE";
}

export interface PaymentDetails {
  id: string;
  location: string;
  area: number;
  type: string;
  amount: number;
  dueDate: string;
  status: "paid" | "unpaid" | "pending";
}

export interface PaymentProps {
  parcelId?: string;
  hideHeader?: boolean;
}