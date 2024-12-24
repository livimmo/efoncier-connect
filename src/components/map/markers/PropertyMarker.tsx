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
  // Create a regular marker
  const marker = new google.maps.Marker({
    position: parcel.location,
    map,
    title: parcel.title,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: getMarkerColor(parcel),
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: '#FFFFFF',
      scale: 8,
    }
  });

  marker.addListener("click", () => {
    const position = getMarkerPixelPosition(marker, map);
    onClick(parcel, position);
  });

  return marker;
};

const getMarkerPixelPosition = (marker: google.maps.Marker, map: google.maps.Map) => {
  const scale = Math.pow(2, map.getZoom() || 0);
  const projection = map.getProjection();
  const bounds = map.getBounds();
  
  if (!projection || !bounds) return { x: 0, y: 0 };

  const position = marker.getPosition();
  if (!position) return { x: 0, y: 0 };

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