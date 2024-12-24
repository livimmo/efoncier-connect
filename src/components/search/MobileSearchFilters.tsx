import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import type { SearchFilters } from "./types";

interface MobileSearchFiltersProps {
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  onClose: () => void;
  onApply: () => void;
}

export const MobileSearchFilters = ({
  filters,
  setFilters,
  onClose,
  onApply,
}: MobileSearchFiltersProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="font-semibold">Filtres</h3>
      </div>

      <ScrollArea className="flex-1 -mx-6 px-6">
        <div className="space-y-6">
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
            <Label>Prix Estimatif (MAD)</Label>
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
                <SelectItem value="casablanca">Casablanca</SelectItem>
                <SelectItem value="rabat">Rabat</SelectItem>
                <SelectItem value="tanger">Tanger</SelectItem>
                <SelectItem value="marrakech">Marrakech</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Type de Bien</Label>
            <Select
              value={filters.propertyType}
              onValueChange={(value) =>
                setFilters({ ...filters, propertyType: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Résidentiel</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industriel</SelectItem>
                <SelectItem value="agricultural">Agricole</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Statut Fiscal</Label>
            <Select
              value={filters.fiscalStatus}
              onValueChange={(value) =>
                setFilters({ ...filters, fiscalStatus: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Payé</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="overdue">En retard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </ScrollArea>

      <div className="mt-6 flex gap-2">
        <Button variant="outline" className="flex-1" onClick={onClose}>
          Annuler
        </Button>
        <Button className="flex-1" onClick={onApply}>
          Appliquer
        </Button>
      </div>
    </div>
  );
};