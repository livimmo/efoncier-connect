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
}