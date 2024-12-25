import { Parcel } from '../types';

export const commercialParcels: Parcel[] = [
  {
    id: "COM001",
    title: "Local Commercial Centre-ville",
    titleDeedNumber: "TF123456",
    address: "123 Rue du Commerce",
    city: "Casablanca",
    description: "Local commercial bien situé",
    surface: 150,
    type: "COMMERCIAL",
    zone: "URBAN",
    taxStatus: "PAID",
    status: "IN_TRANSACTION",
    fiscalStatus: "COMPLIANT",
    location: { lat: 33.5731, lng: -7.5898 },
    ownerName: "Mohammed Alami",
    price: 2500000,
    tnbInfo: {
      pricePerMeter: 100,
      totalAmount: 15000,
      status: 'LOW',
      lastUpdate: "2024-01-15"
    }
  },
  {
    id: "COM002",
    title: "Boutique Marina",
    titleDeedNumber: "TF789012",
    address: "45 Boulevard de la Marina",
    city: "Casablanca",
    description: "Boutique avec vue sur mer",
    surface: 80,
    type: "COMMERCIAL",
    zone: "URBAN",
    taxStatus: "PAID",
    status: "SOLD",
    fiscalStatus: "COMPLIANT",
    location: { lat: 33.5931, lng: -7.6198 },
    ownerName: "Sara Bennani",
    price: 1800000,
    tnbInfo: {
      pricePerMeter: 120,
      totalAmount: 9600,
      status: 'LOW',
      lastUpdate: "2024-02-01"
    }
  },
  {
    id: "COM003",
    title: "Bureau Moderne",
    titleDeedNumber: "TF345678",
    address: "78 Avenue Hassan II",
    city: "Casablanca",
    description: "Espace de bureau moderne",
    surface: 200,
    type: "COMMERCIAL",
    zone: "URBAN",
    taxStatus: "PENDING",
    status: "AVAILABLE",
    fiscalStatus: "UNDER_REVIEW",
    location: { lat: 33.5831, lng: -7.6098 },
    ownerName: "Karim Idrissi",
    price: 3000000,
    tnbInfo: {
      pricePerMeter: 150,
      totalAmount: 30000,
      status: 'AVERAGE',
      lastUpdate: "2024-01-20"
    }
  }
];