import { Parcel } from '../types';
import { createParcelWithTNB } from '../generators/parcelGenerator';

const generateRandomLocation = (baseLocation: { lat: number, lng: number }, radius: number) => {
  const randomAngle = Math.random() * 2 * Math.PI;
  const randomRadius = Math.random() * radius;
  
  const lat = baseLocation.lat + (randomRadius * Math.cos(randomAngle) / 111);
  const lng = baseLocation.lng + (randomRadius * Math.sin(randomAngle) / 111);
  
  return { lat, lng };
};

export const agadirParcels: Parcel[] = Array.from({ length: 20 }).map((_, index) => {
  const propertyTypes = ['RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'MIXED', 'SEASIDE'] as const;
  const zones = ['E3', 'E4', 'BT2', 'I2S12', 'CONSTRUCTIBLE', 'PROTECTED'] as const;
  const taxStatus = ['PAID', 'PENDING', 'OVERDUE'] as const;
  const propertyStatus = ['AVAILABLE', 'DISPUTED', 'UNAVAILABLE', 'IN_TRANSACTION'] as const;

  const baseLocation = { lat: 30.4278, lng: -9.5981 }; // Centre d'Agadir
  const location = generateRandomLocation(baseLocation, 0.1);
  
  return createParcelWithTNB({
    id: `AGA-${index + 1}`,
    title: `Propriété Agadir ${index + 1}`,
    address: `${Math.floor(Math.random() * 999) + 1} ${['Avenue Hassan II', 'Boulevard Mohammed V', 'Rue des Orangers', 'Boulevard 20 Août'][Math.floor(Math.random() * 4)]}`,
    city: 'agadir',
    surface: Math.floor(Math.random() * 1000) + 100,
    type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
    zone: zones[Math.floor(Math.random() * zones.length)],
    taxStatus: taxStatus[Math.floor(Math.random() * taxStatus.length)],
    status: propertyStatus[Math.floor(Math.random() * propertyStatus.length)],
    owner: `Propriétaire Agadir ${index + 1}`,
    location,
    titleDeedNumber: `TF-AGA-${Math.floor(Math.random() * 999999)}`,
    ownerName: `Propriétaire Agadir ${index + 1}`
  });
});