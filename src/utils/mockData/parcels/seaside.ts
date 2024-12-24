import { Parcel } from '../types';
import { createParcelWithTNB } from '../generators/parcelGenerator';

export const seasideParcels: Parcel[] = [
  createParcelWithTNB({
    id: '10',
    title: 'Terrain Constructible - Dar Bouazza',
    address: 'Route Côtière, Dar Bouazza',
    city: 'casablanca',
    surface: 1500,
    type: 'SEASIDE',
    zone: 'CONSTRUCTIBLE',
    taxStatus: 'PAID',
    owner: 'Immobilière Côtière SA',
    location: { lat: 33.5315, lng: -7.7481 },
    titleDeedNumber: 'TF123789/C',
    ownerName: 'Immobilière Côtière SA'
  }),
  createParcelWithTNB({
    id: '18',
    title: 'Terrain Touristique - Tamaris',
    address: 'Route de Tamaris',
    city: 'casablanca',
    surface: 5000,
    type: 'SEASIDE',
    zone: 'CONSTRUCTIBLE',
    taxStatus: 'PENDING',
    owner: 'Groupe Touristique Atlas',
    location: { lat: 33.5315, lng: -7.7481 },
    titleDeedNumber: 'TF678345/C',
    ownerName: 'Groupe Touristique Atlas'
  }),
  createParcelWithTNB({
    id: '30',
    title: 'Résidence Balnéaire - Dar Bouazza',
    address: 'Route Côtière, Dar Bouazza',
    city: 'casablanca',
    surface: 3500,
    type: 'SEASIDE',
    zone: 'CONSTRUCTIBLE',
    taxStatus: 'PENDING',
    owner: 'Groupe Immobilier Littoral',
    location: { lat: 33.5315, lng: -7.7481 },
    titleDeedNumber: 'TF234567/C',
    ownerName: 'Groupe Immobilier Littoral'
  })
];
