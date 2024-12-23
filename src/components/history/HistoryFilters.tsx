import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface HistoryFiltersProps {
  filters: {
    period: string;
    activityType: string;
    status: string;
    amount: number[];
    reference: string;
  };
  onChange: (filters: any) => void;
}

export function HistoryFilters({ filters, onChange }: HistoryFiltersProps) {
  const resetFilters = () => {
    onChange({
      period: "all",
      activityType: "all",
      status: "all",
      amount: [0, 1000000],
      reference: "",
    });
  };

  return (
    <div className="bg-card p-6 rounded-lg border shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">🎯 Affiner votre Historique</h2>
        <Button variant="outline" onClick={resetFilters}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Réinitialiser
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label>📅 Période</Label>
          <Select
            value={filters.period}
            onValueChange={(value) =>
              onChange({ ...filters, period: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="week">7 derniers jours</SelectItem>
              <SelectItem value="month">Ce mois-ci</SelectItem>
              <SelectItem value="custom">Personnalisé</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>🏷️ Type d'Activité</Label>
          <Select
            value={filters.activityType}
            onValueChange={(value) =>
              onChange({ ...filters, activityType: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les activités</SelectItem>
              <SelectItem value="payment">Paiements</SelectItem>
              <SelectItem value="message">Messages</SelectItem>
              <SelectItem value="profile">Modifications Profil</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>✅ Statut</Label>
          <Select
            value={filters.status}
            onValueChange={(value) =>
              onChange({ ...filters, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="confirmed">Confirmé</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="cancelled">Annulé</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>💰 Montant (MAD)</Label>
          <Slider
            value={filters.amount}
            min={0}
            max={1000000}
            step={1000}
            onValueChange={(value) =>
              onChange({ ...filters, amount: value })
            }
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.amount[0]} MAD</span>
            <span>{filters.amount[1]} MAD</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>🔍 Référence</Label>
          <Input
            placeholder="Ex: TX#123456"
            value={filters.reference}
            onChange={(e) =>
              onChange({ ...filters, reference: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}