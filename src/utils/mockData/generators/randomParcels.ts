import { Parcel, PropertyType, ZoneType, TaxStatus, PropertyStatus } from '../types';
import { createParcelWithTNB } from './parcelGenerator';

const REGIONS_CONFIG = {
  casablanca: { center: { lat: 33.5731, lng: -7.5898 }, count: 50 },
  tanger: { center: { lat: 35.7595, lng: -5.8340 }, count: 50 },
  souss: { center: { lat: 30.4167, lng: -9.5833 }, count: 50 },
  rabat: { center: { lat: 34.0209, lng: -6.8416 }, count: 50 }
};

const PROPERTY_TYPES: PropertyType[] = ['RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'AGRICULTURAL'];
const ZONE_TYPES: ZoneType[] = ['E3', 'E4', 'SD1', 'BT2', 'I2S12'];
const TAX_STATUS: TaxStatus[] = ['PAID', 'PENDING', 'OVERDUE'];
const PROPERTY_STATUS: PropertyStatus[] = ['AVAILABLE', 'UNAVAILABLE', 'IN_TRANSACTION'];

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Fonction pour générer une position décalée de 1km
const generateOffsetPosition = (baseLocation: { lat: number, lng: number }, index: number, total: number) => {
  // 0.009 degré ≈ 1km
  const OFFSET = 0.009;
  const gridSize = Math.ceil(Math.sqrt(total));
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;
  
  return {
    lat: baseLocation.lat + (row - gridSize/2) * OFFSET,
    lng: baseLocation.lng + (col - gridSize/2) * OFFSET
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