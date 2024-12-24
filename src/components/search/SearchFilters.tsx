import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@/hooks/use-media-query";

interface SearchFiltersProps {
  filters: {
    minSurface: number;
    maxSurface: number;
    minPrice: number;
    maxPrice: number;
    city: string;
    district: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      minSurface: number;
      maxSurface: number;
      minPrice: number;
      maxPrice: number;
      city: string;
      district: string;
    }>
  >;
}

export const SearchFilters = ({ filters, setFilters }: SearchFiltersProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const cities = ["Casablanca", "Rabat", "Tanger", "Marrakech", "Fès"];
  const districts = {
    Casablanca: ["Maarif", "Anfa", "Ain Diab", "Sidi Maarouf"],
    Rabat: ["Agdal", "Hassan", "Les Orangers"],
    // ... autres districts
  };

  return (
    <div className="bg-card p-4 rounded-lg border shadow-sm space-y-6 animate-fade-in">
      <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
        <div className="space-y-4">
          <Label>Superficie (m²)</Label>
          <Slider
            min={0}
            max={10000}
            step={100}
            value={[filters.minSurface, filters.maxSurface]}
            onValueChange={([min, max]) =>
              setFilters({ ...filters, minSurface: min, maxSurface: max })
            }
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.minSurface} m²</span>
            <span>{filters.maxSurface} m²</span>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Prix (MAD)</Label>
          <Slider
            min={0}
            max={1000000}
            step={10000}
            value={[filters.minPrice, filters.maxPrice]}
            onValueChange={([min, max]) =>
              setFilters({ ...filters, minPrice: min, maxPrice: max })
            }
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.minPrice.toLocaleString()} MAD</span>
            <span>{filters.maxPrice.toLocaleString()} MAD</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Ville</Label>
          <Select
            value={filters.city}
            onValueChange={(value) =>
              setFilters({ ...filters, city: value, district: "" })
            }
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
            value={filters.district}
            onValueChange={(value) =>
              setFilters({ ...filters, district: value })
            }
            disabled={!filters.city}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un quartier" />
            </SelectTrigger>
            <SelectContent>
              {filters.city &&
                districts[filters.city as keyof typeof districts]?.map(
                  (district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  )
                )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};