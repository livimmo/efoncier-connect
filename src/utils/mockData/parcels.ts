import { Parcel } from './types';

export const mockParcels: Parcel[] = [
  {
    id: '1',
    title: 'Terrain Industriel Ain Sebaa',
    titleDeedNumber: 'TF123456/C',
    ownerName: 'Ahmed El Fassi',
    address: '123 Rue de l\'Industrie',
    city: 'casablanca',
    district: 'Ain Sebaa',
    surface: 5000,
    type: 'INDUSTRIAL',
    zone: 'E4',
    price: 3000000,
    taxStatus: 'PAID',
    status: 'FOR_SALE',
    bank: 'Attijariwafa Bank',
    location: { lat: 33.5731, lng: -7.5898 }
  },
  {
    id: '2',
    title: 'Lot Résidentiel Anfa',
    titleDeedNumber: 'TF789012/C',
    ownerName: 'Mohammed Alami',
    address: '45 Boulevard d\'Anfa',
    city: 'casablanca',
    district: 'Anfa',
    surface: 800,
    type: 'RESIDENTIAL',
    zone: 'E3',
    price: 5000000,
    taxStatus: 'PENDING',
    status: 'IN_TRANSACTION',
    location: { lat: 33.5933, lng: -7.6339 }
  },
  {
    id: '3',
    title: 'Zone Commerciale Maarif',
    titleDeedNumber: 'TF345678/C',
    ownerName: 'Société XYZ',
    address: '78 Rue du Commerce',
    city: 'casablanca',
    district: 'Maarif',
    surface: 1200,
    type: 'COMMERCIAL',
    zone: 'BT2',
    price: 4500000,
    taxStatus: 'OVERDUE',
    status: 'IN_DISPUTE',
    bank: 'Bank Populaire',
    location: { lat: 33.5850, lng: -7.6328 }
  }
];