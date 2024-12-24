import { Parcel } from '../types';
import { createParcelWithTNB } from '../generators/parcelGenerator';

export const industrialParcels: Parcel[] = [
  createParcelWithTNB({
    id: '7',
    title: 'Entrepôt Logistique - Ain Sebaa',
    address: '89 Zone Industrielle, Ain Sebaa',
    city: 'casablanca',
    surface: 5000,
    type: 'INDUSTRIAL',
    zone: 'I2S12',
    taxStatus: 'PAID',
    status: 'AVAILABLE',
    owner: 'Logistique Express SARL',
    location: { lat: 33.6167, lng: -7.5504 },
    titleDeedNumber: 'TF678901/C',
    ownerName: 'Logistique Express SARL'
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
    status: 'AVAILABLE',
    owner: 'Industries Modernes SA',
    location: { lat: 33.6167, lng: -7.5167 },
    titleDeedNumber: 'TF678234/C',
    ownerName: 'Industries Modernes SA'
  }),
  createParcelWithTNB({
    id: '29',
    title: 'Entrepôt Frigorifique - Lissasfa',
    address: '789 Zone Industrielle, Lissasfa',
    city: 'casablanca',
    surface: 4000,
    type: 'INDUSTRIAL',
    zone: 'I2S12',
    taxStatus: 'PAID',
    status: 'AVAILABLE',
    owner: 'Froid Logistique SARL',
    location: { lat: 33.5315, lng: -7.6584 },
    titleDeedNumber: 'TF890345/C',
    ownerName: 'Froid Logistique SARL'
  }),
  createParcelWithTNB({
    id: '24',
    title: 'Usine de Production - Sidi Bernoussi',
    address: '567 Zone Industrielle, Sidi Bernoussi',
    city: 'casablanca',
    surface: 8000,
    type: 'INDUSTRIAL',
    zone: 'I2S12',
    taxStatus: 'OVERDUE',
    status: 'AVAILABLE',
    owner: 'Industries du Maroc SA',
    location: { lat: 33.6167, lng: -7.5167 },
    titleDeedNumber: 'TF901234/C',
    ownerName: 'Industries du Maroc SA'
  }),
  createParcelWithTNB({
    id: '26',
    title: 'Centre de Formation - Sidi Maarouf',
    address: '89 Quartier Industriel, Sidi Maarouf',
    city: 'casablanca',
    surface: 2500,
    type: 'INDUSTRIAL',
    zone: 'BT2',
    taxStatus: 'PAID',
    status: 'AVAILABLE',
    owner: 'Institut de Formation Pro',
    location: { lat: 33.5534, lng: -7.6584 },
    titleDeedNumber: 'TF678912/C',
    ownerName: 'Institut de Formation Pro'
  })
];
