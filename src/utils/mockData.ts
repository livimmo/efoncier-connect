// Types
export interface Parcel {
  id: string;
  title: string;
  location: {
    lat: number;
    lng: number;
  };
  surface: number;
  type: 'INDUSTRIAL' | 'RESIDENTIAL' | 'SEASIDE' | 'AGRICULTURAL' | 'COMMERCIAL' | 'MIXED';
  zone: 'E4' | 'E3' | 'BT2' | 'I2S12' | 'PROTECTED' | 'CONSTRUCTIBLE';
  owner: string;
  status: 'FOR_SALE' | 'OCCUPIED' | 'AVAILABLE';
  price?: number;
  city: string;
  address: string;
  taxStatus: 'PAID' | 'PENDING' | 'OVERDUE';
  lastPaymentDate?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'TAXPAYER' | 'DEVELOPER' | 'ADMIN';
  phone: string;
  parcels?: string[];
}

export interface Transaction {
  id: string;
  parcelId: string;
  amount: number;
  date: string;
  type: 'TAX_PAYMENT' | 'SALE' | 'PURCHASE';
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  buyerId?: string;
  sellerId?: string;
}

// Mock Data
export const mockParcels: Parcel[] = [
  {
    id: "TF123456",
    title: "Terrain Industriel Ain Sebaa",
    location: { lat: 33.6177, lng: -7.5137 },
    surface: 5000,
    type: "INDUSTRIAL",
    zone: "I2S12",
    owner: "USER001",
    status: "FOR_SALE",
    price: 2500000,
    city: "Casablanca",
    address: "Zone Industrielle Ain Sebaa, Lot 45",
    taxStatus: "PAID",
    lastPaymentDate: "2024-01-15"
  },
  {
    id: "TF789012",
    title: "Villa California",
    location: { lat: 33.5731, lng: -7.6298 },
    surface: 800,
    type: "RESIDENTIAL",
    zone: "E4",
    owner: "USER002",
    status: "OCCUPIED",
    city: "Casablanca",
    address: "Quartier California, Lot 123",
    taxStatus: "PENDING"
  },
  {
    id: "TF345678",
    title: "Terrain Balnéaire El Harhoura",
    location: { lat: 33.9085, lng: -6.9615 },
    surface: 1200,
    type: "SEASIDE",
    zone: "CONSTRUCTIBLE",
    owner: "USER003",
    status: "FOR_SALE",
    price: 3800000,
    city: "Rabat",
    address: "Plage El Harhoura, Lot 78",
    taxStatus: "OVERDUE",
    lastPaymentDate: "2023-06-20"
  },
  {
    id: "TF901234",
    title: "Ferme Agricole Benslimane",
    location: { lat: 33.6228, lng: -7.1236 },
    surface: 15000,
    type: "AGRICULTURAL",
    zone: "PROTECTED",
    owner: "USER001",
    status: "OCCUPIED",
    city: "Benslimane",
    address: "Route de Fès, KM 5",
    taxStatus: "PAID",
    lastPaymentDate: "2024-02-01"
  },
  {
    id: "TF567890",
    title: "Centre Commercial Tanger City",
    location: { lat: 35.7595, lng: -5.8340 },
    surface: 3000,
    type: "COMMERCIAL",
    zone: "BT2",
    owner: "USER004",
    status: "FOR_SALE",
    price: 8500000,
    city: "Tanger",
    address: "Zone Malabata, Avenue Mohammed VI",
    taxStatus: "PAID",
    lastPaymentDate: "2024-01-30"
  }
];

export const mockUsers: User[] = [
  {
    id: "USER001",
    name: "Hassan Alami",
    email: "hassan.alami@email.com",
    role: "TAXPAYER",
    phone: "+212 661-234567",
    parcels: ["TF123456", "TF901234"]
  },
  {
    id: "USER002",
    name: "Fatima Benani",
    email: "fatima.benani@email.com",
    role: "TAXPAYER",
    phone: "+212 662-345678",
    parcels: ["TF789012"]
  },
  {
    id: "USER003",
    name: "Groupe Immobilier Atlas",
    email: "contact@atlas-immo.ma",
    role: "DEVELOPER",
    phone: "+212 522-987654",
    parcels: ["TF345678"]
  },
  {
    id: "USER004",
    name: "Société Al Omrane",
    email: "info@alomrane.gov.ma",
    role: "DEVELOPER",
    phone: "+212 539-876543",
    parcels: ["TF567890"]
  },
  {
    id: "ADMIN001",
    name: "Mohammed Tazi",
    email: "m.tazi@efoncier.gov.ma",
    role: "ADMIN",
    phone: "+212 537-123456"
  }
];

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