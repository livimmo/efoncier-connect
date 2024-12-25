import { Parcel } from "@/utils/mockData/types";

export const getMarkerColor = (status: string) => {
  switch (status) {
    case 'AVAILABLE':
      return '#006233';
    case 'IN_TRANSACTION':
      return '#FFA500';
    case 'SOLD':
      return '#C1272D';
    default:
      return '#808080';
  }
};

export const getMarkerPixelPosition = (
  marker: google.maps.Marker,
  map: google.maps.Map
): { x: number; y: number } => {
  const bounds = map.getBounds();
  const projection = map.getProjection();
  const position = marker.getPosition();

  if (!bounds || !projection || !position) {
    console.log('Missing required map properties for pixel calculation');
    return { x: 0, y: 0 };
  }

  const nw = new google.maps.LatLng(
    bounds.getNorthEast()?.lat() || 0,
    bounds.getSouthWest()?.lng() || 0
  );

  const worldCoordinateNW = projection.fromLatLngToPoint(nw);
  const worldCoordinate = projection.fromLatLngToPoint(position);

  if (!worldCoordinateNW || !worldCoordinate) {
    console.log('Could not calculate world coordinates');
    return { x: 0, y: 0 };
  }

  const scale = Math.pow(2, map.getZoom() || 0);
  const pixelOffset = new google.maps.Point(
    Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
    Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
  );

  const mapContainer = map.getDiv();
  const containerOffset = {
    x: mapContainer.offsetLeft,
    y: mapContainer.offsetTop
  };

  return {
    x: pixelOffset.x + containerOffset.x,
    y: pixelOffset.y + containerOffset.y
  };
};

export const createMarkers = (
  parcels: Parcel[] | undefined,
  map: google.maps.Map | null,
  onMarkerClick: (parcel: Parcel, position: { x: number; y: number }) => void,
  existingMarkers: google.maps.Marker[]
): google.maps.Marker[] => {
  // Clear existing markers
  existingMarkers.forEach(marker => marker.setMap(null));
  
  if (!map || !parcels || !Array.isArray(parcels) || parcels.length === 0) {
    console.log('No valid parcels to display or map not initialized');
    return [];
  }
  
  const bounds = new google.maps.LatLngBounds();
  const newMarkers: google.maps.Marker[] = [];
  
  parcels.forEach(parcel => {
    if (!parcel?.location?.lat || !parcel?.location?.lng) {
      console.log('Parcel missing valid location:', parcel);
      return;
    }

    const marker = new google.maps.Marker({
      position: {
        lat: parcel.location.lat,
        lng: parcel.location.lng
      },
      map: map,
      title: parcel.title || '',
      optimized: true,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: getMarkerColor(parcel.status),
        fillOpacity: 1,
        strokeWeight: 1,
        strokeColor: '#FFFFFF',
        scale: 8,
      },
    });

    marker.addListener("click", () => {
      const position = getMarkerPixelPosition(marker, map);
      onMarkerClick(parcel, position);
    });

    bounds.extend(marker.getPosition() as google.maps.LatLng);
    newMarkers.push(marker);
  });

  return newMarkers;
};