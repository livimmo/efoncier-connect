import { Parcel } from '../types';
import { createParcelWithTNB } from '../generators/parcelGenerator';

const generateRandomLocation = (baseLocation: { lat: number, lng: number }, radius: number) => {
  const randomAngle = Math.random() * 2 * Math.PI;
  const randomRadius = Math.random() * radius;
  
  const lat = baseLocation.lat + (randomRadius * Math.cos(randomAngle) / 111);
  const lng = baseLocation.lng + (randomRadius * Math.sin(randomAngle) / 111);
  
  return { lat, lng };
};

export const marrakechParcels: Parcel[] = Array.from({ length: 20 }).map((_, index) => {
  const propertyTypes = ['RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'MIXED'] as const;
  const zones = ['E3', 'E4', 'BT2', 'I2S12', 'CONSTRUCTIBLE', 'PROTECTED'] as const;
  const taxStatus = ['PAID', 'PENDING', 'OVERDUE'] as const;

  const baseLocation = { lat: 31.6295, lng: -7.9811 }; // Centre de Marrakech
  const location = generateRandomLocation(baseLocation, 0.1);
  
  return createParcelWithTNB({
    id: `MRK-${index + 1}`,
    title: `Propriété Marrakech ${index + 1}`,
    address: `${Math.floor(Math.random() * 999) + 1} ${['Avenue Mohammed VI', 'Rue Riad Zitoun', 'Avenue Yacoub El Mansour', 'Boulevard Allal Al Fassi'][Math.floor(Math.random() * 4)]}`,
    city: 'marrakech',
    surface: Math.floor(Math.random() * 1000) + 100,
    type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
    zone: zones[Math.floor(Math.random() * zones.length)],
    taxStatus: taxStatus[Math.floor(Math.random() * taxStatus.length)],
    owner: `Propriétaire Marrakech ${index + 1}`,
    location,
    titleDeedNumber: `TF-MRK-${Math.floor(Math.random() * 999999)}`,
    ownerName: `Propriétaire Marrakech ${index + 1}`
  });
});