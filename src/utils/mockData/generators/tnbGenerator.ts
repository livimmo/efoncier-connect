import { PropertyType, TNBInfo, TaxStatus } from '../../../types';

const BASE_RATES: Record<PropertyType, number> = {
  'RESIDENTIAL': 1000,
  'COMMERCIAL': 2000,
  'INDUSTRIAL': 1500,
  'AGRICULTURAL': 500,
  'MIXED': 1200,
  'SEASIDE': 2500
};

export const generateTNBInfo = (surface: number, type: PropertyType): TNBInfo => {
  const baseRate = BASE_RATES[type] || BASE_RATES.RESIDENTIAL;
  const pricePerMeter = baseRate;
  const totalAmount = surface * pricePerMeter;

  const status: TaxStatus = Math.random() > 0.5 ? 'PAID' : 'PENDING';

  return {
    pricePerMeter,
    totalAmount,
    lastUpdate: new Date().toISOString(),
    status
  };
};