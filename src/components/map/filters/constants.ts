export const PROPERTY_TYPES = {
  RESIDENTIAL: 'Résidentiel',
  COMMERCIAL: 'Commercial',
  INDUSTRIAL: 'Industriel',
  AGRICULTURAL: 'Agricole'
} as const;

export const ZONE_TYPES = {
  URBAN: 'Urbain',
  SUBURBAN: 'Périurbain',
  RURAL: 'Rural'
} as const;

export const FISCAL_STATUS = {
  PAID: 'Payé',
  PENDING: 'En attente',
  OVERDUE: 'En retard'
} as const;

export const PROPERTY_STATUS = {
  AVAILABLE: 'Disponible',
  SOLD: 'Vendu',
  IN_TRANSACTION: 'En Transaction'
} as const;