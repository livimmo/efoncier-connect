import { Input } from "@/components/ui/input";
import { SelectFilter } from "@/components/map/filters/SelectFilter";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface NewsFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedRegion: string;
  onRegionChange: (value: string) => void;
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

const categories = [
  { value: "alert", label: "Alerte" },
  { value: "announcement", label: "Annonce" },
  { value: "update", label: "Mise à jour" },
];

const regions = [
  { value: "rabat", label: "Rabat" },
  { value: "casablanca", label: "Casablanca" },
  { value: "marrakech", label: "Marrakech" },
];

export const NewsFilters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedRegion,
  onRegionChange,
  selectedDate,
  onDateChange,
}: NewsFiltersProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Input
        placeholder="Rechercher..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="md:col-span-2"
      />
      
      <SelectFilter
        value={selectedCategory}
        onChange={onCategoryChange}
        options={categories}
        placeholder="Catégorie"
      />

      <SelectFilter
        value={selectedRegion}
        onChange={onRegionChange}
        options={regions}
        placeholder="Région"
      />

      <div className="md:col-span-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? (
                format(selectedDate, "PPP", { locale: fr })
              ) : (
                "Sélectionner une date"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};