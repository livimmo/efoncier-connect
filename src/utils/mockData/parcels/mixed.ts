import { Parcel } from '../types';
import { createParcelWithTNB } from '../generators/parcelGenerator';

export const mixedParcels: Parcel[] = [
  createParcelWithTNB({
    id: '28',
    title: 'Complexe Sportif - Californie',
    address: '456 Boulevard de l\'Atlas, Californie',
    city: 'casablanca',
    surface: 6000,
    type: 'MIXED',
    zone: 'E4',
    taxStatus: 'PAID',
    owner: 'Sport & Loisirs SA',
    location: { lat: 33.5731, lng: -7.5898 },
    titleDeedNumber: 'TF567123/C',
    ownerName: 'Sport & Loisirs SA'
  }),
  createParcelWithTNB({
    id: '5',
    title: 'Local Commercial - Maarif',
    address: '156 Rue Zerktouni, Maarif',
    city: 'casablanca',
    surface: 120,
    type: 'COMMERCIAL',
    zone: 'BT2',
    taxStatus: 'OVERDUE',
    owner: 'Société Retail Plus',
    location: { lat: 33.5876, lng: -7.6331 },
    titleDeedNumber: 'TF567890/C',
    ownerName: 'Société Retail Plus'
  }),
  createParcelWithTNB({
    id: '15',
    title: 'Zone Industrielle - Sidi Bernoussi',
    address: '123 Zone Industrielle, Sidi Bernoussi',
    city: 'casablanca',
    surface: 15000,
    type: 'INDUSTRIAL',
    zone: 'I2S12',
    taxStatus: 'OVERDUE',
    owner: 'Industries Modernes SA',
    location: { lat: 33.6167, lng: -7.5167 },
    titleDeedNumber: 'TF678234/C',
    ownerName: 'Industries Modernes SA'
  }),
  createParcelWithTNB({
    id: '19',
    title: 'Résidence Sécurisée - Oasis',
    address: '90 Quartier Oasis',
    city: 'casablanca',
    surface: 4500,
    type: 'RESIDENTIAL',
    zone: 'E3',
    taxStatus: 'PAID',
    owner: 'Immobilière Prestige',
    location: { lat: 33.5534, lng: -7.6584 },
    titleDeedNumber: 'TF123567/C',
    ownerName: 'Immobilière Prestige'
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
