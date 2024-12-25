export const PROPERTY_TYPES = {
  RESIDENTIAL: "Résidentiel",
  COMMERCIAL: "Commercial",
  INDUSTRIAL: "Industriel",
  AGRICULTURAL: "Agricole",
  MIXED: "Mixte",
  SEASIDE: "Bord de mer",
  HOUSE: "Maison",
  APARTMENT: "Appartement"
} as const;

export const ZONE_TYPES = {
  URBAN: "Urbain",
  SUBURBAN: "Périurbain",
  RURAL: "Rural",
  E3: "E3",
  E4: "E4",
  I2S12: "I2S12",
  BT2: "BT2",
  PROTECTED: "Protégé",
  CONSTRUCTIBLE: "Constructible"
} as const;

export const PAYMENT_STATUS_OPTIONS = [
  { value: "PAID", label: "Payé" },
  { value: "PENDING", label: "En attente" },
  { value: "OVERDUE", label: "En retard" }
] as const;

export const PROPERTY_STATUS_OPTIONS = [
  { value: "AVAILABLE", label: "Disponible" },
  { value: "UNAVAILABLE", label: "Non disponible" },
  { value: "IN_TRANSACTION", label: "En transaction" },
  { value: "SOLD", label: "Vendu" },
  { value: "DISPUTED", label: "Litigieux" }
] as const;