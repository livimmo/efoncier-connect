import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const MapHeader = () => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Explorer les Biens Fonciers Disponibles au Maroc</CardTitle>
        <CardDescription>
          Consultez les biens disponibles, en transaction ou vendus directement sur notre carte interactive.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="text-sm">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <span className="text-sm">En Transaction</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <span className="text-sm">Vendu</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};