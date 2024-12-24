import { Parcel } from '@/utils/mockData/types';

interface ClusterMarkerProps {
  position: google.maps.LatLng;
  count: number;
  available: number;
  sold: number;
  unavailable: number;
  parcels: Parcel[];
  map: google.maps.Map;
}

export const createClusterMarker = ({ position, count, available, sold, unavailable, parcels, map }: ClusterMarkerProps) => {
  const marker = new google.maps.marker.AdvancedMarkerElement({
    position,
    map,
    title: parcels[0]?.city,
  });

  const element = document.createElement('div');
  element.className = 'cluster-marker';
  element.innerHTML = `
    <div class="bg-white rounded-full p-3 shadow-lg" style="min-width: ${Math.max(40, Math.min(count * 5, 60))}px; min-height: ${Math.max(40, Math.min(count * 5, 60))}px;">
      <span class="text-primary font-bold">${count}</span>
    </div>
  `;
  marker.content = element;

  // Créer le contenu de l'info-bulle
  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div class="p-3 bg-white rounded-lg shadow-lg">
        <h3 class="font-semibold mb-2">${parcels[0].city}</h3>
        <div class="space-y-1">
          <p>🏢 Total: ${count}</p>
          <p>🟢 Disponibles: ${available}</p>
          <p>🔴 Vendus: ${sold}</p>
          <p>🟡 Indisponibles: ${unavailable}</p>
        </div>
      </div>
    `,
    disableAutoPan: true,
  });

  let isInfoWindowOpen = false;
  let timeout: NodeJS.Timeout;

  // Ajouter les événements de survol avec délai
  marker.addListener('mouseenter', () => {
    timeout = setTimeout(() => {
      if (!isInfoWindowOpen) {
        infoWindow.open(map, marker);
        isInfoWindowOpen = true;
      }
    }, 200); // Délai de 200ms avant d'afficher l'info-bulle
  });

  marker.addListener('mouseleave', () => {
    clearTimeout(timeout);
    if (isInfoWindowOpen) {
      infoWindow.close();
      isInfoWindowOpen = false;
    }
  });

  // Zoom au clic avec animation
  marker.addListener('click', () => {
    const newZoom = map.getZoom()! + 2;
    map.animateCamera({
      center: position,
      zoom: newZoom,
      duration: 500, // Animation de 500ms
    });
  });

  return marker;
};