import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FiscalYearFilterProps {
  selectedYear: string;
  onYearChange: (value: string) => void;
}

export const FiscalYearFilter = ({ selectedYear, onYearChange }: FiscalYearFilterProps) => {
  const years = Array.from(
    { length: 5 }, 
    (_, i) => (new Date().getFullYear() - i).toString()
  );

  return (
    <div className="space-y-2">
      <Label>Année fiscale</Label>
      <Select value={selectedYear} onValueChange={onYearChange}>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner une année" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year}>{year}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};