import { PropertyType, TNBInfo } from '../types';

const baseRates: Record<PropertyType, number> = {
  'RESIDENTIAL': 4,
  'COMMERCIAL': 8,
  'INDUSTRIAL': 6,
  'AGRICULTURAL': 2,
  'MIXED': 5,
  'SEASIDE': 10,
  'HOUSE': 4,
  'APARTMENT': 4
};

export const generateTNBInfo = (surface: number, type: PropertyType): TNBInfo => {
  const pricePerMeter = baseRates[type] || 4; // Default to 4 DH/m² if type not found
  const totalAmount = surface * pricePerMeter;
  
  return {
    pricePerMeter,
    totalAmount,
    status: totalAmount < 500000 ? 'LOW' : 
            totalAmount < 1000000 ? 'AVERAGE' : 
            'HIGH',
    lastUpdate: new Date().toISOString()
  };
};