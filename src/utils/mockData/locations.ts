export interface Location {
  id: string;
  name: string;
  communes: string[];
}

export const REGIONS: Location[] = [
  {
    id: "tanger-tetouan",
    name: "Tanger-Tétouan-Al Hoceïma",
    communes: [
      "Tanger",
      "Tétouan",
      "Al Hoceïma",
      "Chefchaouen",
      "Ouezzane",
      "M'Diq-Fnideq",
      "Larache",
      "Ksar El Kébir"
    ]
  },
  {
    id: "oriental",
    name: "L'Oriental",
    communes: [
      "Oujda-Angad",
      "Berkane",
      "Nador",
      "Jerada",
      "Taourirt",
      "Driouch",
      "Figuig"
    ]
  },
  {
    id: "fes-meknes",
    name: "Fès-Meknès",
    communes: [
      "Fès",
      "Meknès",
      "Sefrou",
      "El Hajeb",
      "Ifrane",
      "Taza",
      "Boulemane"
    ]
  },
  {
    id: "rabat-sale",
    name: "Rabat-Salé-Kénitra",
    communes: [
      "Rabat",
      "Salé",
      "Kénitra",
      "Skhirat-Témara",
      "Sidi Slimane",
      "Sidi Kacem"
    ]
  },
  {
    id: "beni-mellal",
    name: "Béni Mellal-Khénifra",
    communes: [
      "Béni Mellal",
      "Khénifra",
      "Azilal",
      "Fquih Ben Salah",
      "Kelaat Sraghna"
    ]
  },
  {
    id: "casablanca-settat",
    name: "Casablanca-Settat",
    communes: [
      "Casablanca",
      "Mohammedia",
      "El Jadida",
      "Settat",
      "Berrechid",
      "Benslimane",
      "Mediouna"
    ]
  },
  {
    id: "marrakech-safi",
    name: "Marrakech-Safi",
    communes: [
      "Marrakech",
      "Safi",
      "Essaouira",
      "Youssoufia",
      "Chichaoua",
      "Al Haouz"
    ]
  },
  {
    id: "draa-tafilalet",
    name: "Drâa-Tafilalet",
    communes: [
      "Ouarzazate",
      "Tinghir",
      "Zagora",
      "Errachidia",
      "Midelt"
    ]
  },
  {
    id: "souss-massa",
    name: "Souss-Massa",
    communes: [
      "Agadir",
      "Taroudant",
      "Inezgane",
      "Tiznit",
      "Chtouka Aït Baha"
    ]
  },
  {
    id: "guelmim",
    name: "Guelmim-Oued Noun",
    communes: [
      "Guelmim",
      "Assa-Zag",
      "Tan-Tan",
      "Sidi Ifni"
    ]
  },
  {
    id: "laayoune",
    name: "Laâyoune-Sakia El Hamra",
    communes: [
      "Laâyoune",
      "Boujdour",
      "Tarfaya",
      "Es-Semara"
    ]
  },
  {
    id: "dakhla",
    name: "Dakhla-Oued Ed-Dahab",
    communes: [
      "Dakhla",
      "Aousserd"
    ]
  }
];