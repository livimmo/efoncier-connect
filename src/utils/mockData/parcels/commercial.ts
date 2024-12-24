import { Parcel } from '../types';
import { generateTNBInfo } from '../generators';

const createCommercialParcel = (data: Omit<Parcel, 'tnbInfo'>): Parcel => ({
  ...data,
  tnbInfo: generateTNBInfo(data.surface, data.type)
});

export const commercialParcels: Parcel[] = [
  createCommercialParcel({
    id: '2',
    title: 'Terrain Commercial - Sidi Maârouf',
    address: '78 Zone Industrielle, Sidi Maârouf',
    city: 'casablanca',
    surface: 2500,
    type: 'COMMERCIAL',
    zone: 'I2S12',
    taxStatus: 'PENDING',
    owner: 'SARL Promocasa',
    location: { lat: 33.5933, lng: -7.6339 },
    titleDeedNumber: 'TF789012/C',
    ownerName: 'Société Promocasa'
  }),
  createCommercialParcel({
    id: '3',
    title: 'Immeuble de Bureaux - Marina',
    address: '78 Boulevard des FAR, Marina',
    city: 'casablanca',
    surface: 3500,
    type: 'COMMERCIAL',
    zone: 'BT2',
    taxStatus: 'PAID',
    owner: 'Casa Business Center',
    location: { lat: 33.6069, lng: -7.6192 },
    titleDeedNumber: 'TF890123/C',
    ownerName: 'Casa Business Center'
  }),
  createCommercialParcel({
    id: '9',
    title: 'Centre Commercial - CIL',
    address: '234 Boulevard Mohammed V, CIL',
    city: 'casablanca',
    surface: 8000,
    type: 'COMMERCIAL',
    zone: 'BT2',
    taxStatus: 'PAID',
    owner: 'Groupe Commercial Maroc',
    location: { lat: 33.5731, lng: -7.6353 },
    titleDeedNumber: 'TF789012/C',
    ownerName: 'Groupe Commercial Maroc'
  }),
  createCommercialParcel({
    id: '13',
    title: 'Immeuble de Bureaux - Marina',
    address: '78 Boulevard des FAR, Marina',
    city: 'casablanca',
    surface: 3500,
    type: 'COMMERCIAL',
    zone: 'BT2',
    taxStatus: 'PAID',
    owner: 'Casa Business Center',
    location: { lat: 33.6069, lng: -7.6192 },
    titleDeedNumber: 'TF890123/C',
    ownerName: 'Casa Business Center'
  }),
  createCommercialParcel({
    id: '22',
    title: 'Showroom Automobile - Ain Sebaa',
    address: '345 Boulevard Moulay Slimane, Ain Sebaa',
    city: 'casablanca',
    surface: 1800,
    type: 'COMMERCIAL',
    zone: 'BT2',
    taxStatus: 'PENDING',
    owner: 'Auto Premium SARL',
    location: { lat: 33.6167, lng: -7.5504 },
    titleDeedNumber: 'TF567890/C',
    ownerName: 'Auto Premium SARL'
  }),
  createCommercialParcel({
    id: '24',
    title: 'Usine de Production - Sidi Bernoussi',
    address: '567 Zone Industrielle, Sidi Bernoussi',
    city: 'casablanca',
    surface: 8000,
    type: 'INDUSTRIAL',
    zone: 'I2S12',
    taxStatus: 'OVERDUE',
    owner: 'Industries du Maroc SA',
    location: { lat: 33.6167, lng: -7.5167 },
    titleDeedNumber: 'TF901234/C',
    ownerName: 'Industries du Maroc SA'
  }),
  createCommercialParcel({
    id: '26',
    title: 'Centre de Formation - Sidi Maarouf',
    address: '89 Quartier Industriel, Sidi Maarouf',
    city: 'casablanca',
    surface: 2500,
    type: 'COMMERCIAL',
    zone: 'BT2',
    taxStatus: 'PAID',
    owner: 'Institut de Formation Pro',
    location: { lat: 33.5534, lng: -7.6584 },
    titleDeedNumber: 'TF678912/C',
    ownerName: 'Institut de Formation Pro'
  }),
  createCommercialParcel({
    id: '29',
    title: 'Entrepôt Frigorifique - Lissasfa',
    address: '789 Zone Industrielle, Lissasfa',
    city: 'casablanca',
    surface: 4000,
    type: 'INDUSTRIAL',
    zone: 'I2S12',
    taxStatus: 'PAID',
    owner: 'Froid Logistique SARL',
    location: { lat: 33.5315, lng: -7.6584 },
    titleDeedNumber: 'TF890345/C',
    ownerName: 'Froid Logistique SARL'
  }),
  createCommercialParcel({
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
