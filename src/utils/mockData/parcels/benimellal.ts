import { Parcel } from '../types';
import { createParcelWithTNB } from '../generators/parcelGenerator';

const generateRandomLocation = (baseLocation: { lat: number, lng: number }, radius: number) => {
  const randomAngle = Math.random() * 2 * Math.PI;
  const randomRadius = Math.random() * radius;
  
  const lat = baseLocation.lat + (randomRadius * Math.cos(randomAngle) / 111);
  const lng = baseLocation.lng + (randomRadius * Math.sin(randomAngle) / 111);
  
  return { lat, lng };
};

export const beniMellalParcels: Parcel[] = Array.from({ length: 20 }).map((_, index) => {
  const propertyTypes = ['RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'AGRICULTURAL'] as const;
  const zones = ['E3', 'E4', 'BT2', 'I2S12', 'CONSTRUCTIBLE', 'PROTECTED'] as const;
  const taxStatus = ['PAID', 'PENDING', 'OVERDUE'] as const;
  const statuses = ['AVAILABLE', 'SOLD', 'UNAVAILABLE', 'DISPUTED', 'IN_TRANSACTION'] as const;

  const baseLocation = { lat: 32.3369, lng: -6.3498 }; // Centre de Beni Mellal
  const location = generateRandomLocation(baseLocation, 0.1);
  
  return createParcelWithTNB({
    id: `BNM-${index + 1}`,
    title: `Propriété Beni Mellal ${index + 1}`,
    address: `${Math.floor(Math.random() * 999) + 1} ${['Avenue Mohammed V', 'Boulevard Hassan II', 'Rue Atlas', 'Boulevard de la Marche Verte'][Math.floor(Math.random() * 4)]}`,
    city: 'beni mellal',
    surface: Math.floor(Math.random() * 1000) + 100,
    type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
    zone: zones[Math.floor(Math.random() * zones.length)],
    taxStatus: taxStatus[Math.floor(Math.random() * taxStatus.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    owner: `Propriétaire Beni Mellal ${index + 1}`,
    location,
    titleDeedNumber: `TF-BNM-${Math.floor(Math.random() * 999999)}`,
    ownerName: `Propriétaire Beni Mellal ${index + 1}`
  });
});