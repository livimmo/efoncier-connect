export const ZONING_OPTIONS = [
  { value: 'E3', label: 'Zone E3' },
  { value: 'E4', label: 'Zone E4' },
  { value: 'BT2', label: 'Zone BT2' },
  { value: 'D1', label: 'Zone D1' },
  { value: 'D2', label: 'Zone D2' },
  { value: 'I2S1', label: 'Zone I2S1' },
] as const;

export const PAYMENT_STATUS_OPTIONS = [
  { value: 'paid', label: 'Payé' },
  { value: 'overdue', label: 'En retard' },
  { value: 'pending', label: 'En cours' },
] as const;