import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapFilters } from './map/MapFilters';
import { ParcelInfo } from './map/ParcelInfo';
import { MapHeader } from './map/MapHeader';
import { MapToolbar } from './map/MapToolbar';
import { MapFilters as MapFiltersType } from '@/utils/mockData/types';
import { mockParcels } from '@/utils/mockData/parcels';
import type { Parcel } from '@/utils/mockData/types';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8';

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [isMapSatellite, setIsMapSatellite] = useState(false);
  const [filters, setFilters] = useState<MapFiltersType>({
    city: '',
    district: '',
    propertyType: '',
    zoneType: '',
    size: [0, 15000],
    status: '',
    taxStatus: '',
    priceRange: [0, 5000000],
    titleDeedNumber: ''
  });

  const getMarkerColor = (parcel: Parcel) => {
    switch (parcel.status) {
      case 'FOR_SALE':
        return '#006233'; // Vert
      case 'IN_DISPUTE':
        return '#C1272D'; // Rouge
      case 'IN_TRANSACTION':
        return '#D4AF37'; // Jaune/Or
      default:
        return '#808080'; // Gris
    }
  };

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
            mapTypeId: isMapSatellite ? 'satellite' : 'roadmap',
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
  }, [isMapSatellite]);

  const filterParcels = () => {
    if (!map) return;

    const filteredParcels = mockParcels.filter(parcel => {
      if (filters.city && parcel.city.toLowerCase() !== filters.city.toLowerCase()) return false;
      if (filters.district && parcel.district.toLowerCase() !== filters.district.toLowerCase()) return false;
      if (filters.propertyType && parcel.type !== filters.propertyType) return false;
      if (filters.zoneType && parcel.zone !== filters.zoneType) return false;
      if (filters.status && parcel.status !== filters.status) return false;
      if (filters.taxStatus && parcel.taxStatus !== filters.taxStatus) return false;
      if (parcel.surface < filters.size[0] || parcel.surface > filters.size[1]) return false;
      if (parcel.price && (parcel.price < filters.priceRange[0] || parcel.price > filters.priceRange[1])) return false;
      if (filters.titleDeedNumber && !parcel.titleDeedNumber.toLowerCase().includes(filters.titleDeedNumber.toLowerCase())) return false;
      return true;
    });

    createMarkers(filteredParcels, map);
  };

  return (
    <div className="h-full flex flex-col">
      <MapHeader />
      
      <div className="flex-1 relative">
        <MapFilters 
          filters={filters}
          setFilters={setFilters}
          onApplyFilters={filterParcels}
        />

        <div className="absolute inset-0">
          <div ref={mapRef} className="h-full w-full" />
          
          <MapToolbar 
            onToggleMapType={() => setIsMapSatellite(!isMapSatellite)}
            isMapSatellite={isMapSatellite}
          />

          {selectedParcel && (
            <ParcelInfo 
              parcel={selectedParcel}
              onClose={() => setSelectedParcel(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;