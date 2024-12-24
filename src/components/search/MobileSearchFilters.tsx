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
import { ArrowLeft, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { SearchFilters } from "./types";

interface MobileSearchFiltersProps {
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  onClose: () => void;
  onApply: () => void;
}

const propertyStatusOptions = [
  { value: "available", label: "Disponible", icon: CheckCircle, color: "text-green-500" },
  { value: "sold", label: "Vendu", icon: XCircle, color: "text-red-500" },
  { value: "unavailable", label: "Indisponible", icon: AlertCircle, color: "text-yellow-500" },
];

const fiscalStatusOptions = [
  { value: "paid", label: "Payé", icon: CheckCircle, color: "text-green-500" },
  { value: "unpaid", label: "Impayé", icon: XCircle, color: "text-red-500" },
  { value: "partial", label: "Partiellement Payé", icon: AlertCircle, color: "text-yellow-500" },
];

export const MobileSearchFilters = ({
  filters,
  setFilters,
  onClose,
  onApply,
}: MobileSearchFiltersProps) => {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex items-center gap-2 p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="font-semibold">Filtres</h3>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-6 py-4">
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
              className="mt-2"
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
              className="mt-2"
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
            <Label>Statut du Bien</Label>
            <Select
              value={filters.propertyStatus}
              onValueChange={(value) =>
                setFilters({ ...filters, propertyStatus: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                {propertyStatusOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center">
                        <Icon className={`h-4 w-4 mr-2 ${option.color}`} />
                        {option.label}
                      </div>
                    </SelectItem>
                  );
                })}
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
                {fiscalStatusOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center">
                        <Icon className={`h-4 w-4 mr-2 ${option.color}`} />
                        {option.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Année de Paiement</Label>
            <Select
              value={filters.year}
              onValueChange={(value) =>
                setFilters({ ...filters, year: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une année" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={() => {
              setFilters({
                minSurface: 0,
                maxSurface: 10000,
                minPrice: 0,
                maxPrice: 1000000,
                city: "",
                district: "",
                propertyType: "",
                fiscalStatus: "",
                propertyStatus: "",
                year: "",
                titleDeedNumber: "",
              });
            }}
          >
            Réinitialiser
          </Button>
          <Button className="flex-1" onClick={onApply}>
            Appliquer
          </Button>
        </div>
      </div>
    </div>
  );
};