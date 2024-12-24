import { Parcel } from '../types';
import { generateTNBInfo } from '../generators';

const createResidentialParcel = (data: Omit<Parcel, 'tnbInfo'>): Parcel => ({
  ...data,
  tnbInfo: generateTNBInfo(data.surface, data.type)
});

export const residentialParcels: Parcel[] = [
  createResidentialParcel({
    id: '1',
    title: 'Villa de Luxe - Californie',
    address: '15 Boulevard de l\'Océan, Californie',
    city: 'casablanca',
    surface: 450,
    type: 'RESIDENTIAL',
    zone: 'E3',
    taxStatus: 'PAID',
    owner: 'Groupe Immobilier Atlas',
    location: { lat: 33.5731, lng: -7.5898 },
    titleDeedNumber: 'TF123456/C',
    ownerName: 'Ahmed El Fassi'
  }),
  {
    id: '3',
    title: 'Appartement Haut Standing - Gauthier',
    address: '45 Rue Jean Jaurès, Gauthier',
    city: 'casablanca',
    surface: 180,
    type: 'RESIDENTIAL',
    zone: 'E4',
    taxStatus: 'PAID',
    owner: 'Karim Benjelloun',
    location: { lat: 33.5850, lng: -7.6328 },
    titleDeedNumber: 'TF345678/C',
    ownerName: 'Karim Benjelloun',
    tnbInfo: {
      pricePerMeter: 10,
      totalAmount: 1800,
      lastUpdate: '2024-03-15',
      status: 'LOW'
    }
  },
  {
    id: '6',
    title: 'Villa Modern - Anfa',
    address: '23 Boulevard d\'Anfa',
    city: 'casablanca',
    surface: 600,
    type: 'RESIDENTIAL',
    zone: 'E4',
    taxStatus: 'PAID',
    owner: 'Sofia Alaoui',
    location: { lat: 33.5932, lng: -7.6353 },
    titleDeedNumber: 'TF234567/C',
    ownerName: 'Sofia Alaoui',
    tnbInfo: {
      pricePerMeter: 15,
      totalAmount: 9000,
      lastUpdate: '2024-03-15',
      status: 'HIGH'
    }
  },
  {
    id: '8',
    title: 'Riad Traditionnel - Habous',
    address: '12 Quartier des Habous',
    city: 'casablanca',
    surface: 300,
    type: 'RESIDENTIAL',
    zone: 'PROTECTED',
    taxStatus: 'PENDING',
    owner: 'Hassan El Mansouri',
    location: { lat: 33.5892, lng: -7.6194 },
    titleDeedNumber: 'TF345678/C',
    ownerName: 'Hassan El Mansouri',
    tnbInfo: {
      pricePerMeter: 8,
      totalAmount: 2400,
      lastUpdate: '2024-03-15',
      status: 'LOW'
    }
  },
  {
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
    ownerName: 'Immobilière Côtière SA',
    tnbInfo: {
      pricePerMeter: 20,
      totalAmount: 30000,
      lastUpdate: '2024-03-15',
      status: 'HIGH'
    }
  },
  {
    id: '12',
    title: 'Ferme Agricole - Bouskoura',
    address: 'Route de l\'Aéroport, Bouskoura',
    city: 'casablanca',
    surface: 25000,
    type: 'AGRICULTURAL',
    zone: 'PROTECTED',
    taxStatus: 'PAID',
    owner: 'Coopérative Al Baraka',
    location: { lat: 33.4989, lng: -7.6417 },
    titleDeedNumber: 'TF567123/C',
    ownerName: 'Coopérative Al Baraka',
    tnbInfo: {
      pricePerMeter: 5,
      totalAmount: 125000,
      lastUpdate: '2024-03-15',
      status: 'LOW'
    }
  },
  {
    id: '14',
    title: 'Villa avec Piscine - Ain Diab',
    address: '34 Corniche, Ain Diab',
    city: 'casablanca',
    surface: 800,
    type: 'RESIDENTIAL',
    zone: 'E4',
    taxStatus: 'PAID',
    owner: 'Youssef El Alami',
    location: { lat: 33.5954, lng: -7.6697 },
    titleDeedNumber: 'TF234890/C',
    ownerName: 'Youssef El Alami',
    tnbInfo: {
      pricePerMeter: 18,
      totalAmount: 14400,
      lastUpdate: '2024-03-15',
      status: 'HIGH'
    }
  },
  {
    id: '16',
    title: 'Appartement Vue Mer - Anfa Place',
    address: 'Boulevard de la Corniche, Anfa Place',
    city: 'casablanca',
    surface: 250,
    type: 'RESIDENTIAL',
    zone: 'E4',
    taxStatus: 'PAID',
    owner: 'Nadia Benjelloun',
    location: { lat: 33.5954, lng: -7.6697 },
    titleDeedNumber: 'TF901456/C',
    ownerName: 'Nadia Benjelloun',
    tnbInfo: {
      pricePerMeter: 14,
      totalAmount: 3500,
      lastUpdate: '2024-03-15',
      status: 'AVERAGE'
    }
  },
  {
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
    ownerName: 'Immobilière Prestige',
    tnbInfo: {
      pricePerMeter: 11,
      totalAmount: 49500,
      lastUpdate: '2024-03-15',
      status: 'AVERAGE'
    }
  },
  {
    id: '21',
    title: 'Duplex de Luxe - Racine',
    address: '67 Rue Jean Jaurès, Racine',
    city: 'casablanca',
    surface: 220,
    type: 'RESIDENTIAL',
    zone: 'E4',
    taxStatus: 'PAID',
    owner: 'Sarah El Fassi',
    location: { lat: 33.5892, lng: -7.6353 },
    titleDeedNumber: 'TF234678/C',
    ownerName: 'Sarah El Fassi',
    tnbInfo: {
      pricePerMeter: 13,
      totalAmount: 2860,
      lastUpdate: '2024-03-15',
      status: 'AVERAGE'
    }
  },
  {
    id: '23',
    title: 'Terrain Constructible - Bouskoura Golf City',
    address: 'Bouskoura Golf City',
    city: 'casablanca',
    surface: 1000,
    type: 'RESIDENTIAL',
    zone: 'CONSTRUCTIBLE',
    taxStatus: 'PAID',
    owner: 'Golf Resort Development',
    location: { lat: 33.4989, lng: -7.6417 },
    titleDeedNumber: 'TF789123/C',
    ownerName: 'Golf Resort Development',
    tnbInfo: {
      pricePerMeter: 9,
      totalAmount: 9000,
      lastUpdate: '2024-03-15',
      status: 'LOW'
    }
  },
  {
    id: '25',
    title: 'Penthouse - Twin Center',
    address: 'Boulevard Zerktouni, Twin Center',
    city: 'casablanca',
    surface: 300,
    type: 'RESIDENTIAL',
    zone: 'E4',
    taxStatus: 'PAID',
    owner: 'Mohammed El Kettani',
    location: { lat: 33.5876, lng: -7.6331 },
    titleDeedNumber: 'TF345789/C',
    ownerName: 'Mohammed El Kettani',
    tnbInfo: {
      pricePerMeter: 17,
      totalAmount: 5100,
      lastUpdate: '2024-03-15',
      status: 'HIGH'
    }
  },
  {
    id: '27',
    title: 'Villa Contemporaine - CIL',
    address: '23 Rue des Orangers, CIL',
    city: 'casablanca',
    surface: 400,
    type: 'RESIDENTIAL',
    zone: 'E3',
    taxStatus: 'PENDING',
    owner: 'Amina Benjelloun',
    location: { lat: 33.5731, lng: -7.6353 },
    titleDeedNumber: 'TF123890/C',
    ownerName: 'Amina Benjelloun',
    tnbInfo: {
      pricePerMeter: 16,
      totalAmount: 6400,
      lastUpdate: '2024-03-15',
      status: 'HIGH'
    }
  },
  {
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
    ownerName: 'Sport & Loisirs SA',
    tnbInfo: {
      pricePerMeter: 7,
      totalAmount: 42000,
      lastUpdate: '2024-03-15',
      status: 'LOW'
    }
  },
  {
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
    ownerName: 'Froid Logistique SARL',
    tnbInfo: {
      pricePerMeter: 6,
      totalAmount: 24000,
      lastUpdate: '2024-03-15',
      status: 'LOW'
    }
  },
  {
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
    ownerName: 'Groupe Immobilier Littoral',
    tnbInfo: {
      pricePerMeter: 11,
      totalAmount: 38500,
      lastUpdate: '2024-03-15',
      status: 'AVERAGE'
    }
  }
];
