import { PropertyType, TNBInfo, TaxStatus } from '../../../types';

const baseRates: Record<PropertyType, number> = {
  'RESIDENTIAL': 4,
  'COMMERCIAL': 8,
  'INDUSTRIAL': 6,
  'AGRICULTURAL': 2,
  'MIXED': 5,
  'SEASIDE': 10
};

export const generateTNBInfo = (surface: number, type: PropertyType): TNBInfo => {
  const pricePerMeter = baseRates[type] || 4;
  const totalAmount = surface * pricePerMeter;
  
  let status: TaxStatus = 'PENDING';
  if (totalAmount < 500000) {
    status = 'PAID';
  } else if (totalAmount >= 1000000) {
    status = 'UNPAID';
  }
  
  return {
    pricePerMeter,
    totalAmount,
    status,
    lastUpdate: new Date().toISOString()
  };
};