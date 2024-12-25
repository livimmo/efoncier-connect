import { PropertyType, ZoneType, Parcel } from '../../../types';
import { createParcelWithTNB } from '../generators/parcelGenerator';

const createResidentialParcel = (
  id: string,
  title: string,
  address: string,
  surface: number,
  ownerName: string,
  location: { lat: number; lng: number },
  titleDeedNumber: string,
  city: string = 'casablanca'
): Parcel => {
  return createParcelWithTNB({
    id,
    title,
    titleDeedNumber,
    address,
    city,
    surface,
    type: 'RESIDENTIAL',
    taxStatus: 'PAID',
    status: 'AVAILABLE',
    ownerName,
    location,
    description: '',
    phone: undefined,
    email: undefined,
    price: 0,
    isFavorite: false
  });
};

export const residentialParcels = [
  createResidentialParcel(
    '1',
    'Villa de Luxe - Californie',
    '15 Boulevard de l\'Océan, Californie',
    450,
    'Ahmed El Fassi',
    { lat: 33.5731, lng: -7.5898 },
    'TF123456/C'
  ),
  createResidentialParcel(
    '3',
    'Appartement Haut Standing - Gauthier',
    '45 Rue Jean Jaurès, Gauthier',
    180,
    'Karim Benjelloun',
    { lat: 33.5850, lng: -7.6328 },
    'TF345678/C'
  ),
  createResidentialParcel(
    '6',
    'Villa Modern - Anfa',
    '23 Boulevard d\'Anfa',
    600,
    'Sofia Alaoui',
    { lat: 33.5932, lng: -7.6353 },
    'TF234567/C'
  ),
  createResidentialParcel(
    '8',
    'Riad Traditionnel - Habous',
    '12 Quartier des Habous',
    300,
    'Hassan El Mansouri',
    { lat: 33.5892, lng: -7.6194 },
    'TF345678/C'
  ),
  createResidentialParcel(
    '10',
    'Terrain Constructible - Dar Bouazza',
    'Route Côtière, Dar Bouazza',
    1500,
    'Immobilière Côtière SA',
    { lat: 33.5315, lng: -7.7481 },
    'TF123789/C'
  ),
  createResidentialParcel(
    '12',
    'Ferme Agricole - Bouskoura',
    'Route de l\'Aéroport, Bouskoura',
    25000,
    'Coopérative Al Baraka',
    { lat: 33.4989, lng: -7.6417 },
    'TF567123/C'
  ),
  createResidentialParcel(
    '14',
    'Villa avec Piscine - Ain Diab',
    '34 Corniche, Ain Diab',
    800,
    'Youssef El Alami',
    { lat: 33.5954, lng: -7.6697 },
    'TF234890/C'
  ),
  createResidentialParcel(
    '16',
    'Appartement Vue Mer - Anfa Place',
    'Boulevard de la Corniche, Anfa Place',
    250,
    'Nadia Benjelloun',
    { lat: 33.5954, lng: -7.6697 },
    'TF901456/C'
  ),
  createResidentialParcel(
    '19',
    'Résidence Sécurisée - Oasis',
    '90 Quartier Oasis',
    4500,
    'Immobilière Prestige',
    { lat: 33.5534, lng: -7.6584 },
    'TF123567/C'
  ),
  createResidentialParcel(
    '21',
    'Duplex de Luxe - Racine',
    '67 Rue Jean Jaurès, Racine',
    220,
    'Sarah El Fassi',
    { lat: 33.5892, lng: -7.6353 },
    'TF234678/C'
  ),
  createResidentialParcel(
    '23',
    'Terrain Constructible - Bouskoura Golf City',
    'Bouskoura Golf City',
    1000,
    'Golf Resort Development',
    { lat: 33.4989, lng: -7.6417 },
    'TF789123/C'
  ),
  createResidentialParcel(
    '25',
    'Penthouse - Twin Center',
    'Boulevard Zerktouni, Twin Center',
    300,
    'Mohammed El Kettani',
    { lat: 33.5876, lng: -7.6331 },
    'TF345789/C'
  ),
  createResidentialParcel(
    '27',
    'Villa Contemporaine - CIL',
    '23 Rue des Orangers, CIL',
    400,
    'Amina Benjelloun',
    { lat: 33.5731, lng: -7.6353 },
    'TF123890/C'
  ),
  createResidentialParcel(
    '28',
    'Complexe Sportif - Californie',
    '456 Boulevard de l\'Atlas, Californie',
    6000,
    'Sport & Loisirs SA',
    { lat: 33.5731, lng: -7.5898 },
    'TF567123/C'
  ),
  createResidentialParcel(
    '29',
    'Entrepôt Frigorifique - Lissasfa',
    '789 Zone Industrielle, Lissasfa',
    4000,
    'Froid Logistique SARL',
    { lat: 33.5315, lng: -7.6584 },
    'TF890345/C'
  ),
  createResidentialParcel(
    '30',
    'Résidence Balnéaire - Dar Bouazza',
    'Route Côtière, Dar Bouazza',
    3500,
    'Groupe Immobilier Littoral',
    { lat: 33.5315, lng: -7.7481 },
    'TF234567/C'
  )
];
