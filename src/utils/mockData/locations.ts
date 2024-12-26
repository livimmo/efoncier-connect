export const REGIONS = [
  {
    id: "tanger-tetouan-al-hoceima",
    name: "Tanger-Tétouan-Al Hoceïma",
    center: { lat: 35.7595, lng: -5.8340 },
    cities: [
      {
        name: "Tanger",
        communes: ["Tanger-Assilah", "Fahs-Anjra", "Medina", "Charf-Mghogha"]
      },
      {
        name: "Tétouan",
        communes: ["Tétouan", "M'diq-Fnideq", "Martil", "Oued Laou"]
      },
      {
        name: "Al Hoceïma",
        communes: ["Al Hoceïma", "Bni Boufrah", "Targuist", "Bni Hadifa"]
      }
    ]
  },
  {
    id: "oriental",
    name: "L'Oriental",
    center: { lat: 34.6833, lng: -1.9000 },
    cities: [
      {
        name: "Oujda",
        communes: ["Oujda-Angad", "Bni Drar", "Naima", "Sidi Yahya"]
      },
      {
        name: "Nador",
        communes: ["Nador", "Bni Ansar", "Zeghanghane", "Al Aroui"]
      },
      {
        name: "Berkane",
        communes: ["Berkane", "Saidia", "Ahfir", "Aklim"]
      }
    ]
  },
  {
    id: "fes-meknes",
    name: "Fès-Meknès",
    center: { lat: 34.0333, lng: -5.0000 },
    cities: [
      {
        name: "Fès",
        communes: ["Fès-Médina", "Zouagha", "Saiss", "El Mariniyine"]
      },
      {
        name: "Meknès",
        communes: ["Meknès", "Ouislane", "Toulal", "Boufakrane"]
      },
      {
        name: "Taza",
        communes: ["Taza", "Aknoul", "Tahla", "Oued Amlil"]
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
        communes: ["Hassan", "Agdal-Ryad", "Yacoub El Mansour", "Souissi"]
      },
      {
        name: "Salé",
        communes: ["Bab Lamrissa", "Tabriquet", "Hay Karima", "Bettana"]
      },
      {
        name: "Kénitra",
        communes: ["Kénitra Centre", "Mehdia", "Saknia", "Ouled Oujih"]
      }
    ]
  },
  {
    id: "beni-mellal-khenifra",
    name: "Béni Mellal-Khénifra",
    center: { lat: 32.3333, lng: -6.3500 },
    cities: [
      {
        name: "Béni Mellal",
        communes: ["Béni Mellal", "Kasba Tadla", "El Ksiba", "Zaouiat Cheikh"]
      },
      {
        name: "Khénifra",
        communes: ["Khénifra", "M'rirt", "El Kebab", "Aguelmous"]
      },
      {
        name: "Khouribga",
        communes: ["Khouribga", "Oued Zem", "Boujniba", "Hattane"]
      }
    ]
  },
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
        communes: ["El Alia", "Ben Yakhlef", "Ain Harrouda", "Beni Yakhlef"]
      },
      {
        name: "Settat",
        communes: ["Settat Centre", "Oulad H'Riz", "Sidi El Aidi", "Loulad"]
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
        communes: ["Médina", "Guéliz", "Annakhil", "Ménara", "Sidi Youssef Ben Ali"]
      },
      {
        name: "Safi",
        communes: ["Safi Centre", "Ayir", "Sidi Ouassel", "Jnane Bouih"]
      },
      {
        name: "Essaouira",
        communes: ["Essaouira", "Ounagha", "Ida Ouguerd", "Aquermoud"]
      }
    ]
  },
  {
    id: "draa-tafilalet",
    name: "Drâa-Tafilalet",
    center: { lat: 31.9333, lng: -4.4333 },
    cities: [
      {
        name: "Errachidia",
        communes: ["Errachidia", "Goulmima", "Tinejdad", "Arfoud"]
      },
      {
        name: "Ouarzazate",
        communes: ["Ouarzazate", "Skoura", "Tarmigt", "Ghassate"]
      },
      {
        name: "Zagora",
        communes: ["Zagora", "Agdz", "Tamegroute", "Tagounite"]
      }
    ]
  },
  {
    id: "souss-massa",
    name: "Souss-Massa",
    center: { lat: 30.4167, lng: -9.5833 },
    cities: [
      {
        name: "Agadir",
        communes: ["Agadir", "Anza", "Bensergao", "Dcheira El Jihadia"]
      },
      {
        name: "Inezgane",
        communes: ["Inezgane", "Ait Melloul", "Dcheira", "Temsia"]
      },
      {
        name: "Taroudant",
        communes: ["Taroudant", "Oulad Teima", "Irherm", "Taliouine"]
      }
    ]
  },
  {
    id: "guelmim-oued-noun",
    name: "Guelmim-Oued Noun",
    center: { lat: 28.9833, lng: -10.0667 },
    cities: [
      {
        name: "Guelmim",
        communes: ["Guelmim", "Bouizakarne", "Asrir", "Taghjijt"]
      },
      {
        name: "Tan-Tan",
        communes: ["Tan-Tan", "El Ouatia", "Ben Khlil", "Chbika"]
      },
      {
        name: "Sidi Ifni",
        communes: ["Sidi Ifni", "Mirleft", "Lakhsas", "Tiznit"]
      }
    ]
  },
  {
    id: "laayoune-sakia-el-hamra",
    name: "Laâyoune-Sakia El Hamra",
    center: { lat: 27.1536, lng: -13.2033 },
    cities: [
      {
        name: "Laâyoune",
        communes: ["Laâyoune", "El Marsa", "Foum El Oued", "Boukraa"]
      },
      {
        name: "Boujdour",
        communes: ["Boujdour", "Gueltat Zemmour", "Jraifia", "Lamssid"]
      },
      {
        name: "Es-Semara",
        communes: ["Es-Semara", "Haouza", "Amgala", "Tifariti"]
      }
    ]
  },
  {
    id: "dakhla-oued-ed-dahab",
    name: "Dakhla-Oued Ed-Dahab",
    center: { lat: 23.7167, lng: -15.9333 },
    cities: [
      {
        name: "Dakhla",
        communes: ["Dakhla", "El Argoub", "Bir Anzarane", "Gleibat El Foula"]
      },
      {
        name: "Aousserd",
        communes: ["Aousserd", "Zoug", "Bir Gandouz", "Aghouinit"]
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