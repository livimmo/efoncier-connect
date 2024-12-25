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
  try {
    const bounds = map.getBounds();
    const projection = map.getProjection();
    const position = marker.getPosition();

    if (!bounds || !projection || !position) {
      console.log('Missing required map properties for pixel calculation');
      return { x: 0, y: 0 };
    }

    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();

    if (!northEast || !southWest) {
      console.log('Invalid bounds');
      return { x: 0, y: 0 };
    }

    const nw = new google.maps.LatLng(northEast.lat(), southWest.lng());
    const worldCoordinateNW = projection.fromLatLngToPoint(nw);
    const worldCoordinate = projection.fromLatLngToPoint(position);

    if (!worldCoordinateNW || !worldCoordinate) {
      console.log('Could not calculate world coordinates');
      return { x: 0, y: 0 };
    }

    const zoom = map.getZoom();
    if (typeof zoom !== 'number') {
      console.log('Invalid zoom level');
      return { x: 0, y: 0 };
    }

    const scale = Math.pow(2, zoom);
    const pixelOffset = new google.maps.Point(
      Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
      Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
    );

    const mapContainer = map.getDiv();
    const containerOffset = {
      x: mapContainer.offsetLeft || 0,
      y: mapContainer.offsetTop || 0
    };

    return {
      x: pixelOffset.x + containerOffset.x,
      y: pixelOffset.y + containerOffset.y
    };
  } catch (error) {
    console.error('Error calculating marker position:', error);
    return { x: 0, y: 0 };
  }
};

export const createMarkers = (
  parcels: Parcel[] | undefined,
  map: google.maps.Map | null,
  onMarkerClick: (parcel: Parcel, position: { x: number; y: number }) => void,
  existingMarkers: google.maps.Marker[]
): google.maps.Marker[] => {
  // Clear existing markers
  if (Array.isArray(existingMarkers)) {
    existingMarkers.forEach(marker => {
      if (marker && typeof marker.setMap === 'function') {
        marker.setMap(null);
      }
    });
  }
  
  if (!map || !Array.isArray(parcels) || parcels.length === 0) {
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

    try {
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

      const markerPosition = marker.getPosition();
      if (markerPosition) {
        bounds.extend(markerPosition);
      }
      
      newMarkers.push(marker);
    } catch (error) {
      console.error('Error creating marker for parcel:', parcel, error);
    }
  });

  return newMarkers;
};