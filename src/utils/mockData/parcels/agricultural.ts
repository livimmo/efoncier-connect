import { Parcel } from '../types';
import { createParcelWithTNB } from '../generators/parcelGenerator';

export const agriculturalParcels: Parcel[] = [
  createParcelWithTNB({
    id: '4',
    title: 'Terrain Agricole - Bouskoura',
    address: 'Route de Bouskoura',
    city: 'casablanca',
    surface: 10000,
    type: 'AGRICULTURAL',
    zone: 'PROTECTED',
    taxStatus: 'PAID',
    status: 'AVAILABLE',
    owner: 'Coopérative Al Firdaous',
    location: { lat: 33.5012, lng: -7.6584 },
    titleDeedNumber: 'TF901234/C',
    ownerName: 'Coopérative Al Firdaous'
  }),
  createParcelWithTNB({
    id: '12',
    title: 'Ferme Agricole - Bouskoura',
    address: 'Route de l\'Aéroport, Bouskoura',
    city: 'casablanca',
    surface: 25000,
    type: 'AGRICULTURAL',
    zone: 'PROTECTED',
    taxStatus: 'PAID',
    status: 'AVAILABLE',
    owner: 'Coopérative Al Baraka',
    location: { lat: 33.4989, lng: -7.6417 },
    titleDeedNumber: 'TF567123/C',
    ownerName: 'Coopérative Al Baraka'
  })
];