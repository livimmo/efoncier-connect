import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockParcels } from "@/utils/mockData/parcels";
import { formatCurrency } from "@/utils/format";

export const PropertiesStats = () => {
  const totalProperties = mockParcels.length;
  const totalSurface = mockParcels.reduce((acc, parcel) => acc + parcel.surface, 0);
  const totalTNB = mockParcels.reduce((acc, parcel) => acc + parcel.tnbInfo.totalAmount, 0);
  const unpaidTNB = mockParcels
    .filter(parcel => parcel.taxStatus !== 'PAID')
    .reduce((acc, parcel) => acc + parcel.tnbInfo.totalAmount, 0);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total des Biens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProperties}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Surface Totale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSurface.toLocaleString()} m²</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            TNB Total
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalTNB)} DHS</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            TNB Impayé
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">
            {formatCurrency(unpaidTNB)} DHS
          </div>
        </CardContent>
      </Card>
    </div>
  );
};