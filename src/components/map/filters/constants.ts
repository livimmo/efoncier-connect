export const PROPERTY_TYPES = {
  RESIDENTIAL: "Résidentiel",
  COMMERCIAL: "Commercial",
  INDUSTRIAL: "Industriel",
  AGRICULTURAL: "Agricole",
  SEASIDE: "Balnéaire"
} as const;

export const ZONE_TYPES = {
  URBAN: "Urbain",
  SUBURBAN: "Périurbain",
  RURAL: "Rural",
  INDUSTRIAL_ZONE: "Zone Industrielle",
  TOURIST: "Touristique"
} as const;

export const PAYMENT_STATUS_OPTIONS = [
  { value: "PAID", label: "Payé", variant: "success" as const },
  { value: "PENDING", label: "En attente", variant: "warning" as const },
  { value: "OVERDUE", label: "En retard", variant: "destructive" as const }
];

export const PROPERTY_STATUS_OPTIONS = [
  { value: "AVAILABLE", label: "Disponible", variant: "success" as const },
  { value: "IN_TRANSACTION", label: "En Transaction", variant: "warning" as const },
  { value: "SOLD", label: "Vendu", variant: "destructive" as const }
];