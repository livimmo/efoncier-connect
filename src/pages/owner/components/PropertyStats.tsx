import { Card } from "@/components/ui/card";
import { Building, CheckCircle, AlertTriangle, Clock } from "lucide-react";

export const PropertyStats = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Building className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total des Biens</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-lg">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Biens Payés</p>
            <p className="text-2xl font-bold">8</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow-500/10 rounded-lg">
            <Clock className="h-6 w-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">En Attente</p>
            <p className="text-2xl font-bold">3</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-500/10 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Impayés</p>
            <p className="text-2xl font-bold">1</p>
          </div>
        </div>
      </Card>
    </div>
  );
};