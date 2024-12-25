import { cn } from "@/lib/utils";

interface MapLegendProps {
  className?: string;
  onStatusFilter: (status: string | null) => void;
  activeStatus: string | null;
}

export const MapLegend = ({ className, onStatusFilter, activeStatus }: MapLegendProps) => {
  const statuses = [
    { id: 'AVAILABLE', label: 'Disponible', color: 'bg-green-500' },
    { id: 'IN_TRANSACTION', label: 'En Transaction', color: 'bg-orange-500' },
    { id: 'SOLD', label: 'Vendu', color: 'bg-red-500' }
  ];

  return (
    <div className={cn("absolute bottom-4 right-4 bg-background/95 backdrop-blur-sm p-4 rounded-lg shadow-lg", className)}>
      <div className="space-y-2">
        <h3 className="font-semibold mb-2">Légende</h3>
        {statuses.map((status) => (
          <div
            key={status.id}
            className={cn(
              "flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-accent",
              activeStatus === status.id && "bg-accent"
            )}
            onClick={() => onStatusFilter(activeStatus === status.id ? null : status.id)}
          >
            <div className={cn("w-3 h-3 rounded-full", status.color)} />
            <span className="text-sm">{status.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};