import { PropertyType, TNBInfo } from '../types';

const BASE_PRICES: Record<PropertyType, number> = {
  'RESIDENTIAL': 100,
  'COMMERCIAL': 150,
  'INDUSTRIAL': 200,
  'AGRICULTURAL': 50,
  'MIXED': 125,
  'SEASIDE': 175
};

export const generateTNBInfo = (surface: number, type: PropertyType): TNBInfo => {
  const basePrice = BASE_PRICES[type];
  const pricePerMeter = basePrice * (1 + Math.random() * 0.2);
  const totalAmount = surface * pricePerMeter;
  
  let status: 'LOW' | 'AVERAGE' | 'HIGH';
  if (totalAmount < 10000) status = 'LOW';
  else if (totalAmount < 50000) status = 'AVERAGE';
  else status = 'HIGH';

  return {
    pricePerMeter,
    totalAmount,
    status,
    lastUpdate: new Date().toISOString()
  };
};