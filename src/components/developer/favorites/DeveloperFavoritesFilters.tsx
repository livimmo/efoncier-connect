import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FavoriteFilters } from "./useFavorites";

interface DeveloperFavoritesFiltersProps {
  filters: FavoriteFilters;
  onChange: (filters: FavoriteFilters) => void;
}

export const DeveloperFavoritesFilters = ({
  filters,
  onChange,
}: DeveloperFavoritesFiltersProps) => {
  const handleFilterChange = (key: keyof FavoriteFilters, value: any) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <Label>Recherche</Label>
        <Input
          placeholder="Rechercher par numéro TF, ville..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Région</Label>
        <Select
          value={filters.region}
          onValueChange={(value) => handleFilterChange("region", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une région" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="casablanca">Casablanca-Settat</SelectItem>
            <SelectItem value="rabat">Rabat-Salé-Kénitra</SelectItem>
            <SelectItem value="marrakech">Marrakech-Safi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Superficie (m²)</Label>
        <Slider
          min={0}
          max={10000}
          step={100}
          value={[filters.minSurface, filters.maxSurface]}
          onValueChange={([min, max]) => {
            onChange({
              ...filters,
              minSurface: min,
              maxSurface: max,
            });
          }}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{filters.minSurface} m²</span>
          <span>{filters.maxSurface} m²</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Prix (DHS/m²)</Label>
        <Slider
          min={0}
          max={10000}
          step={100}
          value={[filters.minPrice, filters.maxPrice]}
          onValueChange={([min, max]) => {
            onChange({
              ...filters,
              minPrice: min,
              maxPrice: max,
            });
          }}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{filters.minPrice} DHS</span>
          <span>{filters.maxPrice} DHS</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Statut</Label>
        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Disponible</SelectItem>
            <SelectItem value="in_transaction">En Transaction</SelectItem>
            <SelectItem value="unavailable">Indisponible</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Trier par</Label>
        <Select
          value={filters.sortBy}
          onValueChange={(value: "date" | "price" | "surface") =>
            handleFilterChange("sortBy", value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un tri" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date d'ajout</SelectItem>
            <SelectItem value="price">Prix</SelectItem>
            <SelectItem value="surface">Superficie</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Ordre</Label>
        <Select
          value={filters.sortOrder}
          onValueChange={(value: "asc" | "desc") =>
            handleFilterChange("sortOrder", value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner l'ordre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Croissant</SelectItem>
            <SelectItem value="desc">Décroissant</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};