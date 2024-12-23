import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapFilters } from './map/MapFilters';
import { ParcelInfo } from './map/ParcelInfo';
import { MapFilters as MapFiltersType } from './map/types';
import { mockParcels } from '@/utils/mockData/parcels';
import type { Parcel } from '@/utils/mockData/types';
import { useToast } from "@/components/ui/use-toast";

const GOOGLE_MAPS_API_KEY = 'AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8';

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const { toast } = useToast();
  const [filters, setFilters] = useState<MapFiltersType>({
    city: '',
    propertyType: '',
    zoneType: '',
    size: [0, 15000],
    status: '',
  });

  const createMarkers = (parcels: Parcel[], map: google.maps.Map) => {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    const newMarkers = parcels.map(parcel => {
      const marker = new google.maps.Marker({
        position: parcel.location,
        map: map,
        title: parcel.title,
        animation: google.maps.Animation.DROP,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: parcel.taxStatus === 'PAID' ? '#006233' : '#C1272D',
          fillOpacity: 1,
          strokeWeight: 1,
          strokeColor: '#FFFFFF',
          scale: 8,
        },
      });

      // Add hover effect
      marker.addListener('mouseover', () => {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      });

      marker.addListener('mouseout', () => {
        marker.setAnimation(null);
      });

      marker.addListener("click", () => {
        setSelectedParcel(parcel);
        toast({
          title: "Parcelle sélectionnée",
          description: `${parcel.title} - ${parcel.surface}m²`,
        });
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
            styles: [
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{ color: "#7c93a3" }],
              },
              {
                featureType: "water",
                elementType: "geometry.fill",
                stylers: [{ color: "#E3F2FD" }],
              },
              {
                featureType: "landscape",
                elementType: "geometry.fill",
                stylers: [{ color: "#F5F5F5" }],
              },
            ],
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            gestureHandling: "greedy",
          });

          // Add custom controls
          const centerControl = document.createElement("button");
          centerControl.className = "bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg m-2";
          centerControl.textContent = "Centrer sur Casablanca";
          centerControl.addEventListener("click", () => {
            mapInstance.setCenter({ lat: 33.5731, lng: -7.5898 });
            mapInstance.setZoom(12);
          });

          mapInstance.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControl);

          setMap(mapInstance);
          createMarkers(mockParcels, mapInstance);

          // Add map event listeners
          mapInstance.addListener("zoom_changed", () => {
            const zoom = mapInstance.getZoom();
            if (zoom && zoom < 10) {
              toast({
                title: "Zoom trop éloigné",
                description: "Rapprochez-vous pour voir plus de détails",
                variant: "destructive",
              });
            }
          });
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la carte:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger la carte",
          variant: "destructive",
        });
      }
    };

    initMap();
  }, []);

  const filterParcels = () => {
    if (!map) return;

    const filteredParcels = mockParcels.filter(parcel => {
      if (filters.city && parcel.city.toLowerCase() !== filters.city.toLowerCase()) return false;
      if (filters.propertyType && parcel.type !== filters.propertyType) return false;
      if (filters.zoneType && parcel.zone !== filters.zoneType) return false;
      if (filters.status && parcel.taxStatus !== filters.status) return false;
      if (parcel.surface < filters.size[0] || parcel.surface > filters.size[1]) return false;
      return true;
    });

    createMarkers(filteredParcels, map);
    
    toast({
      title: "Filtres appliqués",
      description: `${filteredParcels.length} parcelles trouvées`,
    });

    // Adjust map bounds to show all filtered parcels
    if (filteredParcels.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      filteredParcels.forEach(parcel => {
        bounds.extend(parcel.location);
      });
      map.fitBounds(bounds);
    }
  };

  return (
    <div className="h-full flex">
      <MapFilters 
        filters={filters}
        setFilters={setFilters}
        onApplyFilters={filterParcels}
      />

      <div className="flex-1 relative">
        <div 
          ref={mapRef} 
          className="absolute inset-0"
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