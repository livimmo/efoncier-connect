import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format";

interface PropertiesStatsProps {
  properties: any[];
}

export function PropertiesStats({ properties }: PropertiesStatsProps) {
  const totalProperties = properties.length;
  const totalArea = properties.reduce((acc, prop) => acc + prop.surface_area, 0);
  const unpaidProperties = properties.filter(p => p.fiscal_status !== 'compliant').length;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total des Biens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProperties}</div>
          <p className="text-xs text-muted-foreground">
            terrains enregistrés
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Superficie Totale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalArea.toLocaleString()} m²</div>
          <p className="text-xs text-muted-foreground">
            sur l'ensemble des terrains
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxes Impayées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{unpaidProperties}</div>
          <p className="text-xs text-muted-foreground">
            terrains avec taxes en attente
          </p>
        </CardContent>
      </Card>
    </div>
  );
}