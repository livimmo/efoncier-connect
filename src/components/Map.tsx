import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
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
import { Search, MapPin, User, Building2, Map as MapIcon } from 'lucide-react';

const cities = ['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès'];
const propertyTypes = ['Résidentiel', 'Commercial', 'Industriel', 'Agricole', 'Mixte'];
const zoningTypes = ['E4', 'E3', 'BT2', 'I2S12', 'Zone protégée'];

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '500px'
};

const center = {
  lat: 33.5731,
  lng: -7.5898 // Casablanca coordinates
};

export const Map = () => {
  const [selectedParcel, setSelectedParcel] = useState<any>(null);

  const handleParcelClick = () => {
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
    <div className="flex h-screen gap-4 p-4 overflow-hidden">
      {/* Filtres Panel */}
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
      <Card className="flex-1 relative">
        <LoadScript googleMapsApiKey="AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={12}
            onClick={handleParcelClick}
          >
            <Marker position={center} onClick={handleParcelClick} />
          </GoogleMap>
        </LoadScript>
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