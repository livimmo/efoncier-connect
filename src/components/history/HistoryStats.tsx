import { Card } from "@/components/ui/card";

export function HistoryStats() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">🧠 Indicateurs Clés</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Total des Paiements</p>
          <p className="text-2xl font-bold">150 000 MAD</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Nombre d'Activités</p>
          <p className="text-2xl font-bold">57</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Paiements en Attente</p>
          <p className="text-2xl font-bold">3</p>
        </div>
      </div>
    </Card>
  );
}