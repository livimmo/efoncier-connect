import { PropertyType } from './types';

// Base rates per square meter for different property types (in MAD)
export const baseRates: Record<PropertyType, number> = {
  'RESIDENTIAL': 8000,
  'COMMERCIAL': 12000,
  'INDUSTRIAL': 5000,
  'AGRICULTURAL': 1000,
  'MIXED': 10000,
  'SEASIDE': 15000,
  'HOUSE': 9000,
  'APARTMENT': 11000
};

// Function to calculate property price based on type and area
export const calculatePropertyPrice = (type: PropertyType, area: number): number => {
  const baseRate = baseRates[type];
  // Add some randomness to the price (±20%)
  const randomFactor = 0.8 + Math.random() * 0.4; // Random between 0.8 and 1.2
  const price = Math.round(baseRate * area * randomFactor);
  // Round to nearest 10000
  return Math.round(price / 10000) * 10000;
};

// Function to generate a random property type
export const getRandomPropertyType = (): PropertyType => {
  const types: PropertyType[] = [
    'RESIDENTIAL',
    'COMMERCIAL',
    'INDUSTRIAL',
    'AGRICULTURAL',
    'MIXED',
    'SEASIDE',
    'HOUSE',
    'APARTMENT'
  ];
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
};