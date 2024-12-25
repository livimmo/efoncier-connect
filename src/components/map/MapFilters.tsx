import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { REGIONS } from "@/utils/mockData/locations";
import { useEffect, useState } from "react";
import { MapFiltersProps } from "./types";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { SmartSearchBar } from "./filters/SmartSearchBar";

export const MapFilters = ({ 
  onRegionChange, 
  onCityChange, 
  onDistrictChange,
  filters,
  setFilters,
  onApplyFilters,
  userRole 
}: MapFiltersProps) => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);

  useEffect(() => {
    if (selectedRegion) {
      const region = REGIONS.find(r => r.id === selectedRegion);
      if (region) {
        setCities(region.communes);
        setSelectedCity("");
        setDistricts([]);
      }
    } else {
      setCities([]);
      setSelectedCity("");
      setDistricts([]);
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedCity) {
      const mockDistricts = [
        `${selectedCity} Nord`,
        `${selectedCity} Sud`,
        `${selectedCity} Est`,
        `${selectedCity} Ouest`,
        `Centre ${selectedCity}`
      ];
      setDistricts(mockDistricts);
    } else {
      setDistricts([]);
    }
  }, [selectedCity]);

  const handleSearch = (query: string) => {
    setFilters?.({
      ...filters!,
      searchQuery: query
    });
    onApplyFilters?.();
  };

  const handleReset = () => {
    if (setFilters) {
      setFilters({
        region: '',
        commune: '',
        propertyType: '',
        zoneType: '',
        size: [0, 15000],
        status: '',
        ownerName: '',
        titleDeedNumber: '',
        lastPaymentDate: null,
        fiscalStatus: '',
        maxPrice: 0,
        tnbReference: '',
        searchQuery: '',
        zoning: ''
      });
    }
    setSelectedRegion("");
    setSelectedCity("");
    onApplyFilters?.();
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Filtres</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SmartSearchBar
          onSearch={handleSearch}
          onReset={handleReset}
          onViewListResults={() => {
            // Handle view list results
          }}
          className="mb-6"
        />

        <div className="space-y-2">
          <Label>Région</Label>
          <Select 
            value={selectedRegion} 
            onValueChange={(value) => {
              setSelectedRegion(value);
              onRegionChange?.(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une région" />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((region) => (
                <SelectItem key={region.id} value={region.id}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Ville</Label>
          <Select 
            value={selectedCity} 
            onValueChange={(value) => {
              setSelectedCity(value);
              onCityChange?.(value);
            }}
            disabled={!selectedRegion}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une ville" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Quartier</Label>
          <Select 
            onValueChange={(value) => onDistrictChange?.(value)}
            disabled={!selectedCity}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un quartier" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Type de propriété</Label>
          <Select
            value={filters?.propertyType}
            onValueChange={(value) => setFilters?.({ ...filters!, propertyType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="RESIDENTIAL">Résidentiel</SelectItem>
              <SelectItem value="COMMERCIAL">Commercial</SelectItem>
              <SelectItem value="INDUSTRIAL">Industriel</SelectItem>
              <SelectItem value="AGRICULTURAL">Agricole</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Superficie (m²)</Label>
          <Slider
            defaultValue={[0, 15000]}
            max={15000}
            step={100}
            value={filters?.size}
            onValueChange={(value) => setFilters?.({ ...filters!, size: value as [number, number] })}
            className="mt-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0 m²</span>
            <span>15 000 m²</span>
          </div>
        </div>

        {userRole === 'commune' && (
          <>
            <div className="space-y-2">
              <Label>Statut fiscal</Label>
              <Select
                value={filters?.fiscalStatus}
                onValueChange={(value) => setFilters?.({ ...filters!, fiscalStatus: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PAID">Payé</SelectItem>
                  <SelectItem value="PENDING">En attente</SelectItem>
                  <SelectItem value="OVERDUE">En retard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Dernière date de paiement</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !filters?.lastPaymentDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters?.lastPaymentDate ? (
                      format(filters.lastPaymentDate, "PPP")
                    ) : (
                      <span>Sélectionner une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters?.lastPaymentDate || undefined}
                    onSelect={(date) => setFilters?.({ ...filters!, lastPaymentDate: date })}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label>Numéro de titre foncier</Label>
          <Input
            placeholder="Entrer le numéro"
            value={filters?.titleDeedNumber}
            onChange={(e) => setFilters?.({ ...filters!, titleDeedNumber: e.target.value })}
          />
        </div>

        {onApplyFilters && (
          <Button 
            className="w-full" 
            onClick={onApplyFilters}
          >
            Appliquer les filtres
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
