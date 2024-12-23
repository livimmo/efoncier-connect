import { Parcel } from './types';

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