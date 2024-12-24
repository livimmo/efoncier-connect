import { Parcel } from '../types';
import { createParcelWithTNB } from '../generators/parcelGenerator';

const generateRandomLocation = (baseLocation: { lat: number, lng: number }, radius: number) => {
  const randomAngle = Math.random() * 2 * Math.PI;
  const randomRadius = Math.random() * radius;
  
  const lat = baseLocation.lat + (randomRadius * Math.cos(randomAngle) / 111);
  const lng = baseLocation.lng + (randomRadius * Math.sin(randomAngle) / 111);
  
  return { lat, lng };
};

export const meknesParcels: Parcel[] = Array.from({ length: 20 }).map((_, index) => {
  const propertyTypes = ['RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'MIXED'] as const;
  const zones = ['E3', 'E4', 'BT2', 'I2S12', 'CONSTRUCTIBLE', 'PROTECTED'] as const;
  const taxStatus = ['PAID', 'PENDING', 'OVERDUE'] as const;

  const baseLocation = { lat: 33.8935, lng: -5.5547 }; // Centre de Meknès
  const location = generateRandomLocation(baseLocation, 0.1);
  
  return createParcelWithTNB({
    id: `MEK-${index + 1}`,
    title: `Propriété Meknès ${index + 1}`,
    address: `${Math.floor(Math.random() * 999) + 1} ${['Avenue des FAR', 'Rue de Paris', 'Boulevard Hassan II', 'Avenue Mohammed V'][Math.floor(Math.random() * 4)]}`,
    city: 'meknes',
    surface: Math.floor(Math.random() * 1000) + 100,
    type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
    zone: zones[Math.floor(Math.random() * zones.length)],
    taxStatus: taxStatus[Math.floor(Math.random() * taxStatus.length)],
    owner: `Propriétaire Meknès ${index + 1}`,
    location,
    titleDeedNumber: `TF-MEK-${Math.floor(Math.random() * 999999)}`,
    ownerName: `Propriétaire Meknès ${index + 1}`
  });
});