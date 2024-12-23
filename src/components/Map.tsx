import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapFilters } from './map/MapFilters';
import { ParcelInfo } from './map/ParcelInfo';
import { MapToolbar } from './map/MapToolbar';
import { MapFilters as MapFiltersType } from './map/types';
import { mockParcels } from '@/utils/mockData/parcels';
import type { Parcel } from '@/utils/mockData/types';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8';

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [showLegend, setShowLegend] = useState(false);
  const [isSatelliteView, setIsSatelliteView] = useState(false);
  const [filters, setFilters] = useState<MapFiltersType>({
    city: '',
    owner: '',
    propertyType: '',
    zoneType: '',
    size: [0, 15000],
    status: '',
    price: [0, 5000000],
    availability: '',
  });

  const createMarkers = (parcels: Parcel[], map: google.maps.Map) => {
    markers.forEach(marker => marker.setMap(null));
    
    const newMarkers = parcels.map(parcel => {
      const marker = new google.maps.Marker({
        position: parcel.location,
        map: map,
        title: parcel.title,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: getMarkerColor(parcel),
          fillOpacity: 1,
          strokeWeight: 1,
          strokeColor: '#FFFFFF',
          scale: 8,
        },
      });

      marker.addListener("click", () => {
        setSelectedParcel(parcel);
      });

      return marker;
    });

    setMarkers(newMarkers);
  };

  const getMarkerColor = (parcel: Parcel) => {
    if (parcel.availability === 'AVAILABLE') return '#4CAF50'; // Vert pour disponible
    if (parcel.availability === 'PENDING') return '#FFC107'; // Jaune pour en cours
    if (parcel.taxStatus === 'OVERDUE') return '#F44336'; // Rouge pour litige/retard
    return '#9E9E9E'; // Gris pour indisponible
  };

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: 'weekly',
      });

      try {
        const google = await loader.load();
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: 33.5731, lng: -7.5898 }, // Casablanca
            zoom: 12,
            mapTypeId: isSatelliteView ? 'satellite' : 'roadmap',
            styles: [
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{ color: "#7c93a3" }],
              },
            ],
          });

          setMap(mapInstance);
          createMarkers(mockParcels, mapInstance);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la carte:", error);
      }
    };

    initMap();
  }, [isSatelliteView]);

  const filterParcels = () => {
    if (!map) return;

    const filteredParcels = mockParcels.filter(parcel => {
      if (filters.city && parcel.city.toLowerCase() !== filters.city.toLowerCase()) return false;
      if (filters.propertyType && parcel.type !== filters.propertyType) return false;
      if (filters.zoneType && parcel.zone !== filters.zoneType) return false;
      if (filters.status && parcel.taxStatus !== filters.status) return false;
      if (parcel.surface < filters.size[0] || parcel.surface > filters.size[1]) return false;
      if (filters.availability && parcel.availability !== filters.availability) return false;
      if (filters.price && parcel.price) {
        if (parcel.price < filters.price[0] || parcel.price > filters.price[1]) return false;
      }
      return true;
    });

    createMarkers(filteredParcels, map);
  };

  return (
    <div className="h-full flex">
      {showFilters && (
        <MapFilters 
          filters={filters}
          setFilters={setFilters}
          onApplyFilters={filterParcels}
        />
      )}

      <div className="flex-1 relative">
        <div 
          ref={mapRef} 
          className="absolute inset-0"
        />

        <MapToolbar 
          onToggleFilters={() => setShowFilters(!showFilters)}
          onToggleLegend={() => setShowLegend(!showLegend)}
          onToggleView={() => setIsSatelliteView(!isSatelliteView)}
          isSatelliteView={isSatelliteView}
        />

        {selectedParcel && (
          <ParcelInfo 
            parcel={selectedParcel}
            onClose={() => setSelectedParcel(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Map;