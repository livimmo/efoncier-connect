import { Parcel } from './types';

export const mockParcels: Parcel[] = [
  {
    id: '1',
    title: 'Terrain Industriel Ain Sebaa',
    address: '123 Rue de l\'Industrie, Ain Sebaa',
    city: 'casablanca',
    surface: 5000,
    type: 'INDUSTRIAL',
    zone: 'E4',
    taxStatus: 'PAID',
    owner: 'Société ABC',
    location: { lat: 33.5731, lng: -7.5898 },
    titleDeedNumber: 'TF123456/C',
    ownerName: 'Ahmed El Fassi'
  },
  {
    id: '2',
    title: 'Lot Résidentiel Anfa',
    address: '45 Boulevard d\'Anfa',
    city: 'casablanca',
    surface: 800,
    type: 'RESIDENTIAL',
    zone: 'E3',
    taxStatus: 'PENDING',
    owner: 'Mohammed Alami',
    location: { lat: 33.5933, lng: -7.6339 },
    titleDeedNumber: 'TF789012/C',
    ownerName: 'Mohammed Alami'
  },
  {
    id: '3',
    title: 'Zone Commerciale Maarif',
    address: '78 Rue du Commerce, Maarif',
    city: 'casablanca',
    surface: 1200,
    type: 'COMMERCIAL',
    zone: 'BT2',
    taxStatus: 'OVERDUE',
    owner: 'Société XYZ',
    location: { lat: 33.5850, lng: -7.6328 },
    titleDeedNumber: 'TF345678/C',
    ownerName: 'Société XYZ'
  }
];