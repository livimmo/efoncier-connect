export const REGIONS = [
  {
    id: "casablanca-settat",
    name: "Casablanca-Settat",
    center: { lat: 33.5731, lng: -7.5898 },
    cities: [
      {
        name: "Casablanca",
        communes: ["Anfa", "Sidi Belyout", "Maarif", "Hay Hassani", "Ain Chock"]
      },
      {
        name: "Mohammedia",
        communes: ["El Alia", "Ben Yakhlef", "Ain Harrouda"]
      },
      {
        name: "Settat",
        communes: ["Settat Centre", "Oulad H'Riz", "Sidi El Aidi"]
      }
    ]
  },
  {
    id: "rabat-sale-kenitra",
    name: "Rabat-Salé-Kénitra",
    center: { lat: 34.0209, lng: -6.8416 },
    cities: [
      {
        name: "Rabat",
        communes: ["Hassan", "Agdal", "Yacoub El Mansour", "Souissi"]
      },
      {
        name: "Salé",
        communes: ["Bab Lamrissa", "Tabriquet", "Hay Karima"]
      },
      {
        name: "Kénitra",
        communes: ["Kénitra Centre", "Mehdia", "Saknia"]
      }
    ]
  },
  {
    id: "marrakech-safi",
    name: "Marrakech-Safi",
    center: { lat: 31.6295, lng: -7.9811 },
    cities: [
      {
        name: "Marrakech",
        communes: ["Médina", "Guéliz", "Annakhil", "Ménara"]
      },
      {
        name: "Safi",
        communes: ["Safi Centre", "Ayir", "Sidi Ouassel"]
      }
    ]
  }
];

export const ZONING_TYPES = [
  { value: 'E2', label: 'Zone E2' },
  { value: 'E3', label: 'Zone E3' },
  { value: 'E4', label: 'Zone E4' },
  { value: 'I2', label: 'Zone I2' },
  { value: 'I2S1', label: 'Zone I2S1' },
  { value: 'BT2', label: 'Zone BT2' },
  { value: 'D1', label: 'Zone D1' },
  { value: 'D2', label: 'Zone D2' }
] as const;