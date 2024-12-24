import { Parcel } from '@/utils/mockData/types';

interface Cluster {
  position: google.maps.LatLng;
  count: number;
  available: number;
  sold: number;
  unavailable: number;
  parcels: Parcel[];
}

export const createClusters = (parcels: Parcel[], zoom: number): Cluster[] => {
  const gridSize = getGridSize(zoom);
  const clusters: { [key: string]: Cluster } = {};

  parcels.forEach(parcel => {
    const key = getGridKey(parcel.location, gridSize);
    
    if (!clusters[key]) {
      clusters[key] = {
        position: new google.maps.LatLng(parcel.location.lat, parcel.location.lng),
        count: 0,
        available: 0,
        sold: 0,
        unavailable: 0,
        parcels: []
      };
    }
    
    clusters[key].count++;
    clusters[key].parcels.push(parcel);
    
    if (parcel.status === 'AVAILABLE') clusters[key].available++;
    else if (parcel.status === 'SOLD') clusters[key].sold++;
    else clusters[key].unavailable++;
  });

  return Object.values(clusters);
};

const getGridSize = (zoom: number): number => {
  // Ajuster la taille de la grille en fonction du niveau de zoom
  if (zoom <= 8) return 1;
  if (zoom <= 10) return 0.5;
  if (zoom <= 12) return 0.1;
  if (zoom <= 14) return 0.05;
  return 0.01;
};

const getGridKey = (location: { lat: number, lng: number }, gridSize: number): string => {
  const lat = Math.floor(location.lat / gridSize) * gridSize;
  const lng = Math.floor(location.lng / gridSize) * gridSize;
  return `${lat},${lng}`;
};