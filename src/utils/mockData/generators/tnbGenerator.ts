import { PropertyType } from '../types';

// TNB rates per square meter for different property types
export const tnbRates: Record<PropertyType, number> = {
  'RESIDENTIAL': 15,
  'COMMERCIAL': 25,
  'INDUSTRIAL': 20,
  'AGRICULTURAL': 8,
  'MIXED': 18,
  'SEASIDE': 30,
  'HOUSE': 20,
  'APARTMENT': 18
};

// Function to calculate TNB based on property type and surface area
export const calculateTNB = (propertyType: PropertyType, surfaceArea: number): number => {
  const rate = tnbRates[propertyType];
  return rate * surfaceArea;
};

// Example usage
const examplePropertyType: PropertyType = 'RESIDENTIAL';
const exampleSurfaceArea = 100; // in square meters
const tnbAmount = calculateTNB(examplePropertyType, exampleSurfaceArea);
console.log(`The TNB for a ${examplePropertyType} property with a surface area of ${exampleSurfaceArea} m² is: ${tnbAmount}`);
