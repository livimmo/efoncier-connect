import { Transaction } from './types';

export const mockTransactions: Transaction[] = [
  {
    id: "TR001",
    parcelId: "TF123456",
    amount: 25000,
    date: "2024-01-15",
    type: "TAX_PAYMENT",
    status: "COMPLETED"
  },
  {
    id: "TR002",
    parcelId: "TF789012",
    amount: 15000,
    date: "2024-02-01",
    type: "TAX_PAYMENT",
    status: "PENDING"
  },
  {
    id: "TR003",
    parcelId: "TF345678",
    amount: 3800000,
    date: "2024-01-20",
    type: "SALE",
    status: "COMPLETED",
    buyerId: "USER003",
    sellerId: "USER002"
  },
  {
    id: "TR004",
    parcelId: "TF901234",
    amount: 18000,
    date: "2024-02-01",
    type: "TAX_PAYMENT",
    status: "COMPLETED"
  },
  {
    id: "TR005",
    parcelId: "TF567890",
    amount: 30000,
    date: "2024-01-30",
    type: "TAX_PAYMENT",
    status: "COMPLETED"
  }
];