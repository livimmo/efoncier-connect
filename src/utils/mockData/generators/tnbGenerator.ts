import { TNBInfo, PropertyType } from '../types';

const BASE_PRICES: Record<PropertyType, number> = {
  'RESIDENTIAL': 12,
  'COMMERCIAL': 15,
  'INDUSTRIAL': 10,
  'AGRICULTURAL': 5,
  'MIXED': 13,
  'SEASIDE': 20
};

export const generateTNBInfo = (surface: number, type: PropertyType): TNBInfo => {
  const basePrice = BASE_PRICES[type] || 10;
  const priceVariation = Math.random() * 5 - 2.5; // -2.5 to +2.5
  const finalPrice = Math.max(basePrice + priceVariation, 5);
  const totalAmount = finalPrice * surface;
  
  let status: 'LOW' | 'AVERAGE' | 'HIGH' = 'AVERAGE';
  if (finalPrice < basePrice - 1) status = 'LOW';
  if (finalPrice > basePrice + 1) status = 'HIGH';

  return {
    pricePerMeter: Math.round(finalPrice * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    lastUpdate: '2024-03-15',
    status
  };
};