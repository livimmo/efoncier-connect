import { Card } from "../ui/card";

export const MapLegend = () => {
  const legendItems = [
    { color: '#4CAF50', label: 'À Vendre' },
    { color: '#FFC107', label: 'En Transaction' },
    { color: '#F44336', label: 'En Litige' },
    { color: '#9E9E9E', label: 'Indisponible' },
  ];

  return (
    <Card className="absolute bottom-4 right-4 p-4 bg-white/90 backdrop-blur-sm">
      <h3 className="font-semibold mb-2">Légende</h3>
      <div className="space-y-2">
        {legendItems.map(item => (
          <div key={item.label} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};