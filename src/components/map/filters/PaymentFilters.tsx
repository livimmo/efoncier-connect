import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { MapFilters } from "../types";
import { PAYMENT_STATUS_OPTIONS } from "./filterConstants";

interface PaymentFiltersProps {
  filters: MapFilters;
  setFilters: (filters: MapFilters) => void;
  userRole?: string;
}

export const PaymentFilters = ({ filters, setFilters, userRole }: PaymentFiltersProps) => {
  if (userRole !== 'commune') return null;

  return (
    <>
      <div className="space-y-2">
        <Label>Statut fiscal</Label>
        <Select
          value={filters.fiscalStatus}
          onValueChange={(value) => setFilters({ ...filters, fiscalStatus: value })}
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
        <Label>Statut de paiement</Label>
        <Select
          value={filters.paymentStatus}
          onValueChange={(value) => setFilters({ ...filters, paymentStatus: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un statut" />
          </SelectTrigger>
          <SelectContent>
            {PAYMENT_STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
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
                !filters.lastPaymentDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.lastPaymentDate ? (
                format(filters.lastPaymentDate, "PPP")
              ) : (
                <span>Sélectionner une date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filters.lastPaymentDate || undefined}
              onSelect={(date) => setFilters({ ...filters, lastPaymentDate: date })}
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};