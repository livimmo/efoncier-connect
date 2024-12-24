import { Parcel } from '@/utils/mockData/types';

interface PropertyMarkerProps {
  parcel: Parcel;
  map: google.maps.Map;
  onClick: (parcel: Parcel, position: { x: number, y: number }) => void;
}

const getMarkerColor = (parcel: Parcel) => {
  switch (parcel.taxStatus) {
    case 'PAID':
      return '#006233'; // Vert
    case 'OVERDUE':
      return '#C1272D'; // Rouge
    default:
      return '#FFA500'; // Orange pour "en attente"
  }
};

export const createPropertyMarker = ({ parcel, map, onClick }: PropertyMarkerProps) => {
  const marker = new google.maps.marker.AdvancedMarkerElement({
    position: parcel.location,
    map,
    title: parcel.title,
  });

  const element = document.createElement('div');
  element.className = 'property-marker';
  element.innerHTML = `
    <div class="rounded-full w-4 h-4" style="background-color: ${getMarkerColor(parcel)}; border: 1px solid white;"></div>
  `;
  marker.content = element;

  marker.addListener("click", () => {
    const position = getMarkerPixelPosition(marker, map);
    onClick(parcel, position);
  });

  return marker;
};

const getMarkerPixelPosition = (marker: google.maps.marker.AdvancedMarkerElement, map: google.maps.Map) => {
  const scale = Math.pow(2, map.getZoom() || 0);
  const projection = map.getProjection();
  const bounds = map.getBounds();
  
  if (!projection || !bounds) return { x: 0, y: 0 };

  const position = marker.position as google.maps.LatLng;
  const worldPoint = projection.fromLatLngToPoint(position);
  const topRight = projection.fromLatLngToPoint(bounds.getNorthEast());
  const bottomLeft = projection.fromLatLngToPoint(bounds.getSouthWest());
  
  const p = new google.maps.Point(
    (worldPoint.x - bottomLeft.x) * scale,
    (worldPoint.y - topRight.y) * scale
  );

  const mapDiv = map.getDiv();
  return {
    x: p.x + mapDiv.offsetLeft,
    y: p.y + mapDiv.offsetTop
  };
};