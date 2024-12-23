import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { mockParcels, Parcel } from '@/utils/mockData';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8';

type PropertyType = 'INDUSTRIAL' | 'RESIDENTIAL' | 'SEASIDE' | 'AGRICULTURAL' | 'COMMERCIAL' | 'MIXED';
type ZoneType = 'E4' | 'E3' | 'BT2' | 'I2S12' | 'PROTECTED' | 'CONSTRUCTIBLE';

interface MapFilters {
  city: string;
  owner: string;
  propertyType: PropertyType | '';
  zoneType: ZoneType | '';
  size: [number, number];
}

export const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [filters, setFilters] = useState<MapFilters>({
    city: '',
    owner: '',
    propertyType: '',
    zoneType: '',
    size: [0, 15000],
  });

  const createMarkers = (parcels: Parcel[], map: google.maps.Map) => {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    const newMarkers = parcels.map(parcel => {
      const marker = new google.maps.Marker({
        position: parcel.location,
        map: map,
        title: parcel.title,
      });

      marker.addListener("click", () => {
        console.log("Parcelle sélectionnée:", parcel);
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
  }, []);

  const filterParcels = () => {
    if (!map) return;

    const filteredParcels = mockParcels.filter(parcel => {
      if (filters.city && parcel.city.toLowerCase() !== filters.city.toLowerCase()) return false;
      if (filters.propertyType && parcel.type !== filters.propertyType) return false;
      if (filters.zoneType && parcel.zone !== filters.zoneType) return false;
      if (parcel.surface < filters.size[0] || parcel.surface > filters.size[1]) return false;
      return true;
    });

    createMarkers(filteredParcels, map);
  };

  return (
    <div className="h-full flex">
      <div className="w-64 bg-white p-4 shadow-lg space-y-4">
        <h2 className="text-lg font-semibold mb-4">Filtres</h2>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Ville</label>
          <Select
            value={filters.city}
            onValueChange={(value) => setFilters({ ...filters, city: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une ville" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casablanca">Casablanca</SelectItem>
              <SelectItem value="rabat">Rabat</SelectItem>
              <SelectItem value="tanger">Tanger</SelectItem>
              <SelectItem value="benslimane">Benslimane</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Type de Terrain</label>
          <Select
            value={filters.propertyType}
            onValueChange={(value) => setFilters({ ...filters, propertyType: value as PropertyType })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type de terrain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INDUSTRIAL">Industriel</SelectItem>
              <SelectItem value="RESIDENTIAL">Résidentiel</SelectItem>
              <SelectItem value="SEASIDE">Balnéaire</SelectItem>
              <SelectItem value="AGRICULTURAL">Agricole</SelectItem>
              <SelectItem value="COMMERCIAL">Commercial</SelectItem>
              <SelectItem value="MIXED">Mixte</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Zoning</label>
          <Select
            value={filters.zoneType}
            onValueChange={(value) => setFilters({ ...filters, zoneType: value as ZoneType })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Zoning" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="E4">E4</SelectItem>
              <SelectItem value="E3">E3</SelectItem>
              <SelectItem value="BT2">BT2</SelectItem>
              <SelectItem value="I2S12">I2S12</SelectItem>
              <SelectItem value="PROTECTED">Zone protégée</SelectItem>
              <SelectItem value="CONSTRUCTIBLE">Zone constructible</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Superficie (m²)</label>
          <Slider
            defaultValue={[0, 15000]}
            max={15000}
            step={100}
            onValueChange={(value) => setFilters({ ...filters, size: value as [number, number] })}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{filters.size[0]} m²</span>
            <span>{filters.size[1]} m²</span>
          </div>
        </div>

        <Button 
          className="w-full"
          onClick={filterParcels}
        >
          Appliquer les filtres
        </Button>
      </div>

      <div 
        ref={mapRef} 
        className="flex-1 h-[calc(100vh-4rem)]"
      />
    </div>
  );
};