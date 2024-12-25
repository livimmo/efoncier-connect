import { generateParcel } from '../generators/parcelGenerator';

export const residentialParcels = [
  generateParcel({
    id: 'RES001',
    title: 'Villa Moderne Californie',
    titleDeedNumber: 'TR123456',
    address: '123 Rue des Jardins',
    city: 'Casablanca',
    surface: 400,
    type: 'RESIDENTIAL',
    taxStatus: 'PAID',
    status: 'AVAILABLE',
    zone: 'RESIDENTIAL',
    ownerName: 'Ahmed Benjelloun',
    location: { lat: 33.5731, lng: -7.5898 },
    description: 'Belle villa moderne dans quartier calme',
    price: 3500000
  }),
  generateParcel({
    id: 'RES002',
    title: 'Appartement Luxueux',
    titleDeedNumber: 'TR123457',
    address: '456 Avenue des Fleurs',
    city: 'Casablanca',
    surface: 150,
    type: 'RESIDENTIAL',
    taxStatus: 'PAID',
    status: 'AVAILABLE',
    zone: 'RESIDENTIAL',
    ownerName: 'Fatima Zahra',
    location: { lat: 33.5732, lng: -7.5899 },
    description: 'Appartement moderne avec vue sur mer',
    price: 2000000
  }),
  generateParcel({
    id: 'RES003',
    title: 'Maison de Ville',
    titleDeedNumber: 'TR123458',
    address: '789 Rue des Acacias',
    city: 'Casablanca',
    surface: 300,
    type: 'RESIDENTIAL',
    taxStatus: 'PAID',
    status: 'AVAILABLE',
    zone: 'RESIDENTIAL',
    ownerName: 'Youssef El Amrani',
    location: { lat: 33.5733, lng: -7.5900 },
    description: 'Maison de ville spacieuse avec jardin',
    price: 2800000
  }),
  generateParcel({
    id: 'RES004',
    title: 'Penthouse avec Terrasse',
    titleDeedNumber: 'TR123459',
    address: '321 Boulevard de l\'Océan',
    city: 'Casablanca',
    surface: 500,
    type: 'RESIDENTIAL',
    taxStatus: 'PAID',
    status: 'AVAILABLE',
    zone: 'RESIDENTIAL',
    ownerName: 'Khalid Boussif',
    location: { lat: 33.5734, lng: -7.5901 },
    description: 'Penthouse de luxe avec grande terrasse',
    price: 5000000
  }),
];
