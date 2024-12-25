import { PropertyType } from './types';

// Base rates per square meter for different property types
export const baseRates: Record<PropertyType, number> = {
  'RESIDENTIAL': 1000,
  'COMMERCIAL': 2000,
  'INDUSTRIAL': 1500,
  'AGRICULTURAL': 500,
  'MIXED': 1200,
  'SEASIDE': 2500
};

// Function to calculate property price based on type and area
export const calculatePropertyPrice = (type: PropertyType, area: number): number => {
  const baseRate = baseRates[type];
  return baseRate * area;
};

// Function to generate a random property type
export const getRandomPropertyType = (): PropertyType => {
  const types: PropertyType[] = [
    'RESIDENTIAL',
    'COMMERCIAL',
    'INDUSTRIAL',
    'AGRICULTURAL',
    'MIXED',
    'SEASIDE'
  ];
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
};