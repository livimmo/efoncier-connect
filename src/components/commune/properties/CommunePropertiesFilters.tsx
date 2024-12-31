import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FiltersProps {
  propertyType: string;
  status: string;
  fiscalStatus: string;
  zone: string;
  dateRange: any;
  surface: number[];
}

interface CommunePropertiesFiltersProps {
  filters: FiltersProps;
  setFilters: (filters: FiltersProps) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const CommunePropertiesFilters = ({
  filters,
  setFilters,
  isCollapsed,
  onToggleCollapse,
}: CommunePropertiesFiltersProps) => {
  return (
    <Card className={cn(
      "fixed h-[calc(100vh-12rem)] transition-all duration-300",
      isCollapsed ? "w-[60px]" : "w-[300px]"
    )}>
      <div className="p-4 flex items-center justify-between border-b">
        {!isCollapsed && <h3 className="font-semibold">Filtres</h3>}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="ml-auto"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {!isCollapsed && (
        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-5rem)]">
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
                <SelectItem value="RESIDENTIAL">Résidentiel</SelectItem>
                <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                <SelectItem value="INDUSTRIAL">Industriel</SelectItem>
                <SelectItem value="AGRICULTURAL">Agricole</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Statut du Bien</Label>
            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters({ ...filters, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AVAILABLE">Disponible</SelectItem>
                <SelectItem value="SOLD">Vendu</SelectItem>
                <SelectItem value="IN_TRANSACTION">En Transaction</SelectItem>
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
                <SelectItem value="PAID">Payé</SelectItem>
                <SelectItem value="PENDING">En Attente</SelectItem>
                <SelectItem value="OVERDUE">En Retard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Zone</Label>
            <Select
              value={filters.zone}
              onValueChange={(value) =>
                setFilters({ ...filters, zone: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="E3">E3</SelectItem>
                <SelectItem value="E4">E4</SelectItem>
                <SelectItem value="BT2">BT2</SelectItem>
                <SelectItem value="I2S12">I2S12</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Surface (m²)</Label>
            <Slider
              value={filters.surface}
              onValueChange={(value) =>
                setFilters({ ...filters, surface: value as number[] })
              }
              min={0}
              max={1000}
              step={10}
              className="mt-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filters.surface[0]} m²</span>
              <span>{filters.surface[1]} m²</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              setFilters({
                propertyType: "",
                status: "",
                fiscalStatus: "",
                zone: "",
                dateRange: null,
                surface: [0, 1000],
              })
            }
          >
            Réinitialiser les filtres
          </Button>
        </div>
      )}
    </Card>
  );
};