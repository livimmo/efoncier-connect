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
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Search, Filter, Download, MapPin } from "lucide-react";
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
  status: 'PAID' | 'PENDING' | 'OVERDUE' | '';
}

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [filters, setFilters] = useState<MapFilters>({
    city: '',
    owner: '',
    propertyType: '',
    zoneType: '',
    size: [0, 15000],
    status: '',
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
          fillColor: parcel.taxStatus === 'PAID' ? '#006233' : '#C1272D',
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
      if (filters.status && parcel.taxStatus !== filters.status) return false;
      if (parcel.surface < filters.size[0] || parcel.surface > filters.size[1]) return false;
      return true;
    });

    createMarkers(filteredParcels, map);
  };

  return (
    <div className="h-full flex">
      {/* Filtres */}
      <div className="w-80 bg-white p-6 shadow-lg space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filtres</h2>
          <Button variant="ghost" size="sm" onClick={() => setFilters({
            city: '',
            owner: '',
            propertyType: '',
            zoneType: '',
            size: [0, 15000],
            status: '',
          })}>
            Réinitialiser
          </Button>
        </div>
        
        <div className="space-y-4">
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
            <label className="text-sm font-medium">Statut Fiscal</label>
            <Select
              value={filters.status}
              onValueChange={(value) => setFilters({ ...filters, status: value as 'PAID' | 'PENDING' | 'OVERDUE' | '' })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Statut fiscal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PAID">Payé</SelectItem>
                <SelectItem value="PENDING">En attente</SelectItem>
                <SelectItem value="OVERDUE">En retard</SelectItem>
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
      </div>

      {/* Carte */}
      <div className="flex-1 relative">
        <div 
          ref={mapRef} 
          className="absolute inset-0"
        />

        {/* Info Parcelle */}
        {selectedParcel && (
          <Card className="absolute top-4 right-4 w-80 p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{selectedParcel.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedParcel.address}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedParcel(null)}
              >
                ×
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Surface</span>
                <span className="text-sm font-medium">{selectedParcel.surface} m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Type</span>
                <span className="text-sm font-medium">{selectedParcel.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Zone</span>
                <span className="text-sm font-medium">{selectedParcel.zone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Statut</span>
                <span className={`text-sm font-medium ${
                  selectedParcel.taxStatus === 'PAID' 
                    ? 'text-green-600' 
                    : selectedParcel.taxStatus === 'OVERDUE' 
                    ? 'text-red-600' 
                    : 'text-orange-600'
                }`}>
                  {selectedParcel.taxStatus === 'PAID' 
                    ? 'Payé' 
                    : selectedParcel.taxStatus === 'OVERDUE' 
                    ? 'En retard' 
                    : 'En attente'}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                className="flex-1"
                onClick={() => window.location.href = `/payment/${selectedParcel.id}`}
              >
                Payer
              </Button>
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => window.location.href = `/contact/${selectedParcel.owner}`}
              >
                Contacter
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Map;
