import { PropertyType, ZoneType } from '../types';
import { createParcelWithTNB } from '../generators/parcelGenerator';
import { createBaseParcel } from '../generators/baseParcelTemplate';

const createResidentialParcel = (
  id: string,
  title: string,
  address: string,
  surface: number,
  zone: ZoneType,
  taxStatus: 'PAID' | 'PENDING' | 'OVERDUE',
  owner: string,
  location: { lat: number; lng: number },
  titleDeedNumber: string,
  ownerName: string
) => {
  return createParcelWithTNB(
    createBaseParcel({
      id,
      title,
      address,
      city: 'casablanca',
      surface,
      type: 'RESIDENTIAL',
      zone,
      taxStatus,
      status: 'AVAILABLE',
      owner,
      location,
      titleDeedNumber,
      ownerName
    })
  );
};

export const residentialParcels = [
  createResidentialParcel(
    '1',
    'Villa de Luxe - Californie',
    '15 Boulevard de l\'Océan, Californie',
    450,
    'E3',
    'PAID',
    'Groupe Immobilier Atlas',
    { lat: 33.5731, lng: -7.5898 },
    'TF123456/C',
    'Ahmed El Fassi'
  ),
  createResidentialParcel(
    '3',
    'Appartement Haut Standing - Gauthier',
    '45 Rue Jean Jaurès, Gauthier',
    180,
    'E4',
    'PAID',
    'Karim Benjelloun',
    { lat: 33.5850, lng: -7.6328 },
    'TF345678/C',
    'Karim Benjelloun'
  ),
  createResidentialParcel(
    '6',
    'Villa Modern - Anfa',
    '23 Boulevard d\'Anfa',
    600,
    'E4',
    'PAID',
    'Sofia Alaoui',
    { lat: 33.5932, lng: -7.6353 },
    'TF234567/C',
    'Sofia Alaoui'
  ),
  createResidentialParcel(
    '8',
    'Riad Traditionnel - Habous',
    '12 Quartier des Habous',
    300,
    'PROTECTED',
    'PENDING',
    'Hassan El Mansouri',
    { lat: 33.5892, lng: -7.6194 },
    'TF345678/C',
    'Hassan El Mansouri'
  ),
  createResidentialParcel(
    '10',
    'Terrain Constructible - Dar Bouazza',
    'Route Côtière, Dar Bouazza',
    1500,
    'CONSTRUCTIBLE',
    'PAID',
    'Immobilière Côtière SA',
    { lat: 33.5315, lng: -7.7481 },
    'TF123789/C',
    'Immobilière Côtière SA'
  ),
  createResidentialParcel(
    '12',
    'Ferme Agricole - Bouskoura',
    'Route de l\'Aéroport, Bouskoura',
    25000,
    'PROTECTED',
    'PAID',
    'Coopérative Al Baraka',
    { lat: 33.4989, lng: -7.6417 },
    'TF567123/C',
    'Coopérative Al Baraka'
  ),
  createResidentialParcel(
    '14',
    'Villa avec Piscine - Ain Diab',
    '34 Corniche, Ain Diab',
    800,
    'E4',
    'PAID',
    'Youssef El Alami',
    { lat: 33.5954, lng: -7.6697 },
    'TF234890/C',
    'Youssef El Alami'
  ),
  createResidentialParcel(
    '16',
    'Appartement Vue Mer - Anfa Place',
    'Boulevard de la Corniche, Anfa Place',
    250,
    'E4',
    'PAID',
    'Nadia Benjelloun',
    { lat: 33.5954, lng: -7.6697 },
    'TF901456/C',
    'Nadia Benjelloun'
  ),
  createResidentialParcel(
    '19',
    'Résidence Sécurisée - Oasis',
    '90 Quartier Oasis',
    4500,
    'E3',
    'PAID',
    'Immobilière Prestige',
    { lat: 33.5534, lng: -7.6584 },
    'TF123567/C',
    'Immobilière Prestige'
  ),
  createResidentialParcel(
    '21',
    'Duplex de Luxe - Racine',
    '67 Rue Jean Jaurès, Racine',
    220,
    'E4',
    'PAID',
    'Sarah El Fassi',
    { lat: 33.5892, lng: -7.6353 },
    'TF234678/C',
    'Sarah El Fassi'
  ),
  createResidentialParcel(
    '23',
    'Terrain Constructible - Bouskoura Golf City',
    'Bouskoura Golf City',
    1000,
    'CONSTRUCTIBLE',
    'PAID',
    'Golf Resort Development',
    { lat: 33.4989, lng: -7.6417 },
    'TF789123/C',
    'Golf Resort Development'
  ),
  createResidentialParcel(
    '25',
    'Penthouse - Twin Center',
    'Boulevard Zerktouni, Twin Center',
    300,
    'E4',
    'PAID',
    'Mohammed El Kettani',
    { lat: 33.5876, lng: -7.6331 },
    'TF345789/C',
    'Mohammed El Kettani'
  ),
  createResidentialParcel(
    '27',
    'Villa Contemporaine - CIL',
    '23 Rue des Orangers, CIL',
    400,
    'E3',
    'PENDING',
    'Amina Benjelloun',
    { lat: 33.5731, lng: -7.6353 },
    'TF123890/C',
    'Amina Benjelloun'
  ),
  createResidentialParcel(
    '28',
    'Complexe Sportif - Californie',
    '456 Boulevard de l\'Atlas, Californie',
    6000,
    'E4',
    'PAID',
    'Sport & Loisirs SA',
    { lat: 33.5731, lng: -7.5898 },
    'TF567123/C',
    'Sport & Loisirs SA'
  ),
  createResidentialParcel(
    '29',
    'Entrepôt Frigorifique - Lissasfa',
    '789 Zone Industrielle, Lissasfa',
    4000,
    'I2S12',
    'PAID',
    'Froid Logistique SARL',
    { lat: 33.5315, lng: -7.6584 },
    'TF890345/C',
    'Froid Logistique SARL'
  ),
  createResidentialParcel(
    '30',
    'Résidence Balnéaire - Dar Bouazza',
    'Route Côtière, Dar Bouazza',
    3500,
    'CONSTRUCTIBLE',
    'PENDING',
    'Groupe Immobilier Littoral',
    { lat: 33.5315, lng: -7.7481 },
    'TF234567/C',
    'Groupe Immobilier Littoral'
  )
];
