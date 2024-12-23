import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapFilters } from './map/MapFilters';
import { ParcelInfo } from './map/ParcelInfo';
import { MapControls } from './map/MapControls';
import { WelcomeDialog } from './map/WelcomeDialog';
import { PartnersCarousel } from './map/PartnersCarousel';
import { MapFilters as MapFiltersType, MapControls as MapControlsType, MapSettings } from './map/types';
import { mockParcels } from '@/utils/mockData/parcels';
import type { Parcel } from '@/utils/mockData/types';
import { useToast } from "@/hooks/use-toast";

const GOOGLE_MAPS_API_KEY = 'AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8';
const DEFAULT_CENTER = { lat: 33.5731, lng: -7.5898 }; // Casablanca
const DEFAULT_ZOOM = 12;

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

  const [controls, setControls] = useState<MapControlsType>({
    showFilters: false,
    show3DView: false,
    showComparison: false,
    showHistory: false,
  });

  const [settings, setSettings] = useState<MapSettings>({
    theme: 'light',
    unit: 'metric',
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

  const handleControlChange = (control: keyof MapControlsType) => {
    setControls(prev => ({
      ...prev,
      [control]: !prev[control]
    }));

    if (control === 'show3DView' && map) {
      map.setTilt(controls.show3DView ? 0 : 45);
    }
  };

  const handleSettingChange = (setting: keyof MapSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));

    if (setting === 'theme' && map) {
      const styles = value === 'dark' ? [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      ] : [
        { featureType: "all", elementType: "labels.text.fill", stylers: [{ color: "#7c93a3" }] },
        { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#E3F2FD" }] },
        { featureType: "landscape", elementType: "geometry.fill", stylers: [{ color: "#F5F5F5" }] },
      ];

      map.setOptions({ styles });
    }
  };

  const handleZoomIn = () => {
    if (map) {
      map.setZoom((map.getZoom() || DEFAULT_ZOOM) + 1);
    }
  };

  const handleZoomOut = () => {
    if (map) {
      map.setZoom((map.getZoom() || DEFAULT_ZOOM) - 1);
    }
  };

  const handleReset = () => {
    if (map) {
      map.setCenter(DEFAULT_CENTER);
      map.setZoom(DEFAULT_ZOOM);
      map.setTilt(0);
    }
  };

  const handleLocateMe = () => {
    return new Promise<void>((resolve, reject) => {
      if (!map) return reject(new Error('Map not initialized'));

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            map.setCenter(pos);
            map.setZoom(15);
            resolve();
          },
          () => {
            reject(new Error('Geolocation failed'));
          }
        );
      } else {
        reject(new Error('Geolocation not supported'));
      }
    });
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
            center: DEFAULT_CENTER,
            zoom: DEFAULT_ZOOM,
            styles: settings.theme === 'dark' ? [
              { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            ] : [
              { featureType: "all", elementType: "labels.text.fill", stylers: [{ color: "#7c93a3" }] },
              { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#E3F2FD" }] },
              { featureType: "landscape", elementType: "geometry.fill", stylers: [{ color: "#F5F5F5" }] },
            ],
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            gestureHandling: "greedy",
          });

          setMap(mapInstance);
          createMarkers(mockParcels, mapInstance);

          // Notification de succès
          toast({
            title: "Carte chargée",
            description: "La carte a été initialisée avec succès",
          });
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la carte:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger la carte Google Maps",
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
    <div className="h-screen flex flex-col">
      <WelcomeDialog />
      
      <div className="flex-1 relative">
        <MapFilters 
          filters={filters}
          setFilters={setFilters}
          onApplyFilters={filterParcels}
        />

        <div className="flex-1 relative">
          <div 
            ref={mapRef} 
            className="absolute inset-0 w-full h-full"
            style={{ minHeight: '500px' }}
          />

          <MapControls
            controls={controls}
            settings={settings}
            onControlChange={handleControlChange}
            onSettingChange={handleSettingChange}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onReset={handleReset}
            onLocateMe={handleLocateMe}
          />

          {selectedParcel && (
            <ParcelInfo 
              parcel={selectedParcel}
              onClose={() => setSelectedParcel(null)}
            />
          )}
        </div>
      </div>

      <PartnersCarousel />
    </div>
  );
};

export default Map;