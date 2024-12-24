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
  // Create a regular marker first
  const marker = new google.maps.Marker({
    position,
    map,
    title: parcels[0]?.city,
  });

  // Create custom HTML element for the marker
  const element = document.createElement('div');
  element.className = 'cluster-marker';
  element.innerHTML = `
    <div class="bg-white rounded-full p-3 shadow-lg flex items-center justify-center" style="min-width: ${Math.max(40, Math.min(count * 5, 60))}px; min-height: ${Math.max(40, Math.min(count * 5, 60))}px;">
      <span class="text-primary font-bold">${count}</span>
    </div>
  `;

  // Create the info window content
  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div class="p-3 bg-white rounded-lg shadow-lg">
        <h3 class="font-semibold mb-2">${parcels[0]?.city || 'Zone'}</h3>
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

  // Add hover events with delay
  marker.addListener('mouseover', () => {
    timeout = setTimeout(() => {
      if (!isInfoWindowOpen) {
        infoWindow.open(map, marker);
        isInfoWindowOpen = true;
      }
    }, 200);
  });

  marker.addListener('mouseout', () => {
    clearTimeout(timeout);
    if (isInfoWindowOpen) {
      infoWindow.close();
      isInfoWindowOpen = false;
    }
  });

  // Add click event for zooming
  marker.addListener('click', () => {
    const newZoom = map.getZoom()! + 2;
    map.setZoom(newZoom);
    map.panTo(position);
  });

  return marker;
};