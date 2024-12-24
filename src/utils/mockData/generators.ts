import { TNBInfo, TNBStatus, PropertyType } from './types';

export const generateTNBInfo = (surface: number, type: PropertyType): TNBInfo => {
  // Base price per property type
  const basePrices: Record<PropertyType, number> = {
    'RESIDENTIAL': 12,
    'COMMERCIAL': 15,
    'INDUSTRIAL': 10,
    'AGRICULTURAL': 5,
    'MIXED': 13,
    'SEASIDE': 20
  };

  const basePrice = basePrices[type] || 10;
  
  // Add some variation
  const priceVariation = Math.random() * 5 - 2.5; // -2.5 to +2.5
  const finalPrice = Math.max(basePrice + priceVariation, 5);
  
  // Calculate total amount
  const totalAmount = finalPrice * surface;
  
  // Determine status based on price compared to base
  let status: TNBStatus = 'AVERAGE';
  if (finalPrice < basePrice - 1) status = 'LOW';
  if (finalPrice > basePrice + 1) status = 'HIGH';

  return {
    pricePerMeter: Math.round(finalPrice * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    lastUpdate: '2024-03-15',
    status
  };
};