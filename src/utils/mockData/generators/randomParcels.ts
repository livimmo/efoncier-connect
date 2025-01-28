import { Parcel, PropertyType, ZoneType, TaxStatus, PropertyStatus } from '../types';
import { createParcelWithTNB } from './parcelGenerator';

// Définition des régions principales du Maroc avec leurs centres
const REGIONS_CONFIG = {
  casablanca: { center: { lat: 33.5731, lng: -7.5898 }, count: 20 },
  rabat: { center: { lat: 34.0209, lng: -6.8416 }, count: 20 },
  tanger: { center: { lat: 35.7595, lng: -5.8340 }, count: 20 },
  fes: { center: { lat: 34.0333, lng: -5.0000 }, count: 20 },
  marrakech: { center: { lat: 31.6295, lng: -7.9811 }, count: 20 },
  agadir: { center: { lat: 30.4167, lng: -9.5833 }, count: 20 },
  oujda: { center: { lat: 34.6833, lng: -1.9000 }, count: 20 },
  meknes: { center: { lat: 33.8935, lng: -5.5547 }, count: 20 }
};

const PROPERTY_TYPES: PropertyType[] = ['RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'AGRICULTURAL'];
const ZONE_TYPES: ZoneType[] = ['E3', 'E4', 'SD1', 'BT2', 'I2S12'];
const TAX_STATUS: TaxStatus[] = ['PAID', 'PENDING', 'OVERDUE'];
const PROPERTY_STATUS: PropertyStatus[] = ['AVAILABLE', 'UNAVAILABLE', 'IN_TRANSACTION'];

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Fonction pour générer une position avec un décalage plus petit (500m à 2km)
const generateOffsetPosition = (baseLocation: { lat: number, lng: number }, index: number, total: number) => {
  // 0.004 degré ≈ 500m, utilisons un offset plus petit
  const OFFSET = 0.004;
  const gridSize = Math.ceil(Math.sqrt(total));
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;
  
  // Ajout d'un peu de randomisation pour éviter une grille trop parfaite
  const randomOffset = () => (Math.random() - 0.5) * 0.002; // ±250m de variation aléatoire
  
  return {
    lat: baseLocation.lat + (row - gridSize/2) * OFFSET + randomOffset(),
    lng: baseLocation.lng + (col - gridSize/2) * OFFSET + randomOffset()
  };
};

export const generateRandomParcels = (): Parcel[] => {
  const parcels: Parcel[] = [];
  let parcelId = 1;

  Object.entries(REGIONS_CONFIG).forEach(([region, config]) => {
    for (let i = 0; i < config.count; i++) {
      const location = generateOffsetPosition(config.center, i, config.count);
      
      const parcel = createParcelWithTNB({
        id: `${region.toUpperCase()}-${parcelId++}`,
        title: `Terrain ${region} ${i + 1}`,
        address: `${Math.floor(Math.random() * 999) + 1} ${region}`,
        city: region,
        surface: Math.floor(Math.random() * 900) + 100, // 100 à 1000 m²
        type: getRandomElement(PROPERTY_TYPES),
        zone: getRandomElement(ZONE_TYPES),
        taxStatus: getRandomElement(TAX_STATUS),
        status: getRandomElement(PROPERTY_STATUS),
        owner: `Propriétaire ${parcelId}`,
        location,
        titleDeedNumber: `TF-${region.toUpperCase()}-${Math.floor(Math.random() * 999999)}`,
        ownerName: `Propriétaire ${parcelId}`
      });

      parcels.push(parcel);
    }
  });

  return parcels;
};