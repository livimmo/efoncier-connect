export const getCityRegion = (city: string): string => {
  const cityToRegion: Record<string, string> = {
    'casablanca': 'Casablanca-Settat',
    'marrakech': 'Marrakech-Safi',
    'agadir': 'Souss-Massa',
    'tanger': 'Tanger-Tétouan-Al Hoceïma',
    'meknes': 'Fès-Meknès',
    'beni mellal': 'Béni Mellal-Khénifra'
  };

  return cityToRegion[city.toLowerCase()] || 'Unknown';
};