import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { MapFilters } from "../types";
import { mockParcels } from "@/utils/mockData/parcels";

interface PaymentFiltersProps {
  filters: MapFilters;
  setFilters: (filters: MapFilters) => void;
  userRole?: string;
}

export const PaymentFilters = ({ filters, setFilters, userRole }: PaymentFiltersProps) => {
  if (userRole !== 'commune') return null;

  const paymentStatusCounts = {
    PAID: mockParcels.filter(p => p.taxStatus === 'PAID').length,
    PENDING: mockParcels.filter(p => p.taxStatus === 'PENDING').length,
    OVERDUE: mockParcels.filter(p => p.taxStatus === 'OVERDUE').length
  };

  return (
    <>
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
            <SelectItem value="">Tous les statuts</SelectItem>
            <SelectItem value="PAID">Payé ({paymentStatusCounts.PAID})</SelectItem>
            <SelectItem value="PENDING">En attente ({paymentStatusCounts.PENDING})</SelectItem>
            <SelectItem value="OVERDUE">En retard ({paymentStatusCounts.OVERDUE})</SelectItem>
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