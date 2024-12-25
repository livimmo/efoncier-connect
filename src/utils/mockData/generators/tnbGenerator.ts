import { PropertyType, TNBInfo } from '../types';

const baseRates: Record<PropertyType, number> = {
  'RESIDENTIAL': 1000,
  'COMMERCIAL': 2000,
  'INDUSTRIAL': 1500,
  'AGRICULTURAL': 500,
  'MIXED': 1200,
  'SEASIDE': 2500,
  'HOUSE': 1800,
  'APARTMENT': 1600
};

export const generateTNBInfo = (surface: number, type: PropertyType): TNBInfo => {
  const pricePerMeter = baseRates[type] || 1000;
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