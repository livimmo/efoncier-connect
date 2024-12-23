import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from './ui/card';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from './ui/input';
import { Search, MapPin, User, Ruler, Building2, Map as MapIcon } from 'lucide-react';

// Temporary token - should be moved to environment variables
mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHNqOXh4NW0wMWZrMmpxcjRxc3RwOHl4In0.qRwJqzDNxV1z9ipz2pT11g';

const cities = ['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès'];
const propertyTypes = ['Résidentiel', 'Commercial', 'Industriel', 'Agricole', 'Mixte'];
const zoningTypes = ['E4', 'E3', 'BT2', 'I2S12', 'Zone protégée'];

export const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedParcel, setSelectedParcel] = useState<any>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-7.5898, 33.5731], // Casablanca coordinates
      zoom: 12,
      pitch: 45,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    return () => {
      map.current?.remove();
    };
  }, []);

  const handleParcelClick = () => {
    // Example parcel data
    setSelectedParcel({
      id: 'TF#123456',
      owner: 'Ahmed El Fassi',
      bank: 'Attijariwafa Bank',
      city: 'Casablanca',
      district: 'Maarif',
      area: '3,500',
      type: 'Résidentiel',
      zoning: 'BT2',
      status: 'Impayé',
      amount: '25,000',
      lastPayment: 'Janvier 2023'
    });
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4 p-4">
      {/* Filters Panel */}
      <Card className="w-80 p-4 space-y-4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Filtres</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Ville
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une ville" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city.toLowerCase()}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <User className="w-4 h-4" />
              Propriétaire
            </label>
            <Input placeholder="Rechercher par nom" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Type de terrain
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <MapIcon className="w-4 h-4" />
              Zoning
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un zoning" />
              </SelectTrigger>
              <SelectContent>
                {zoningTypes.map((zone) => (
                  <SelectItem key={zone} value={zone.toLowerCase()}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full" onClick={() => console.log("Appliquer les filtres")}>
            <Search className="w-4 h-4 mr-2" />
            Appliquer les filtres
          </Button>
        </div>
      </Card>

      {/* Map Container */}
      <Card className="flex-1 relative overflow-hidden">
        <div ref={mapContainer} className="absolute inset-0" />
      </Card>

      {/* Parcel Details Panel */}
      {selectedParcel && (
        <Card className="w-96 p-4 space-y-4 overflow-y-auto">
          <h3 className="text-lg font-semibold">Détails de la parcelle</h3>
          <div className="space-y-2">
            <p><strong>Titre Foncier:</strong> {selectedParcel.id}</p>
            <p><strong>Propriétaire:</strong> {selectedParcel.owner}</p>
            <p><strong>Banque:</strong> {selectedParcel.bank}</p>
            <p><strong>Ville:</strong> {selectedParcel.city}</p>
            <p><strong>Commune:</strong> {selectedParcel.district}</p>
            <p><strong>Superficie:</strong> {selectedParcel.area} m²</p>
            <p><strong>Type:</strong> {selectedParcel.type}</p>
            <p><strong>Zoning:</strong> {selectedParcel.zoning}</p>
            <p><strong>Statut fiscal:</strong> {selectedParcel.status}</p>
            <p><strong>Montant dû:</strong> {selectedParcel.amount} MAD</p>
            <p><strong>Dernier paiement:</strong> {selectedParcel.lastPayment}</p>
          </div>
          <div className="space-y-2">
            <Button className="w-full" variant="outline">
              Télécharger le relevé fiscal
            </Button>
            <Button className="w-full">
              Payer la taxe en ligne
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};