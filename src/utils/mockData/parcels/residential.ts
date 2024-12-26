import { Parcel } from '../types';
import { createParcelWithTNB } from '../generators/parcelGenerator';

export const residentialParcels: Parcel[] = [
  createParcelWithTNB({
    id: '1',
    title: 'Terrain Résidentiel - Californie',
    address: '123 Boulevard Californie',
    city: 'casablanca',
    surface: 500,
    type: 'RESIDENTIAL',
    zone: 'E4',
    taxStatus: 'PAID',
    status: 'AVAILABLE',
    owner: 'Ahmed Benjelloun',
    location: { lat: 33.5731, lng: -7.6298 },
    titleDeedNumber: 'TF123456/C',
    ownerName: 'Ahmed Benjelloun'
  }),
  createParcelWithTNB({
    id: '2',
    title: 'Terrain Résidentiel - Anfa',
    address: '45 Boulevard d\'Anfa',
    city: 'casablanca',
    surface: 800,
    type: 'RESIDENTIAL',
    zone: 'E3',
    taxStatus: 'PENDING',
    status: 'AVAILABLE',
    owner: 'Sofia Alami',
    location: { lat: 33.5931, lng: -7.6328 },
    titleDeedNumber: 'TF234567/C',
    ownerName: 'Sofia Alami'
  }),
  createParcelWithTNB({
    id: '3',
    title: 'Terrain Résidentiel - Ain Diab',
    address: '78 Corniche Ain Diab',
    city: 'casablanca',
    surface: 1200,
    type: 'RESIDENTIAL',
    zone: 'BT2',
    taxStatus: 'PAID',
    status: 'AVAILABLE',
    owner: 'Karim Tazi',
    location: { lat: 33.5831, lng: -7.6698 },
    titleDeedNumber: 'TF345678/C',
    ownerName: 'Karim Tazi'
  })
];