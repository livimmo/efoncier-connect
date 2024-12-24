import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, DollarSign, LayoutDashboard } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ProfileStatsProps {
  profile: {
    id: string;
  };
}

export function ProfileStats({ profile }: ProfileStatsProps) {
  const { data: stats } = useQuery({
    queryKey: ['profile-stats', profile.id],
    queryFn: async () => {
      // Fetch properties count
      const { count: propertiesCount } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })
        .eq('owner_id', profile.id);

      // Fetch total payments
      const { data: payments } = await supabase
        .from('payments')
        .select('amount, status')
        .eq('user_id', profile.id);

      const totalPaid = payments?.reduce((acc, payment) => 
        payment.status === 'completed' ? acc + Number(payment.amount) : acc, 0
      ) || 0;

      const totalUnpaid = payments?.reduce((acc, payment) => 
        payment.status === 'pending' ? acc + Number(payment.amount) : acc, 0
      ) || 0;

      // Get dominant property type
      const { data: properties } = await supabase
        .from('properties')
        .select('property_type')
        .eq('owner_id', profile.id);

      const typeCount = properties?.reduce((acc: Record<string, number>, prop) => {
        acc[prop.property_type] = (acc[prop.property_type] || 0) + 1;
        return acc;
      }, {});

      const dominantType = typeCount ? 
        Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0]?.[0] 
        : 'N/A';

      return {
        propertiesCount: propertiesCount || 0,
        totalPaid,
        totalUnpaid,
        dominantType
      };
    }
  });

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Biens Gérés
          </CardTitle>
          <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.propertiesCount || 0}</div>
          <p className="text-xs text-muted-foreground">
            propriétés enregistrées
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            TNB Total
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat('fr-MA', { 
              style: 'currency', 
              currency: 'MAD',
              maximumFractionDigits: 0
            }).format(stats?.totalPaid || 0)}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats?.totalUnpaid ? `${new Intl.NumberFormat('fr-MA', { 
              style: 'currency', 
              currency: 'MAD',
              maximumFractionDigits: 0 
            }).format(stats.totalUnpaid)} impayés` : 'Aucun impayé'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Type Dominant
          </CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats?.dominantType || 'N/A'}
          </div>
          <p className="text-xs text-muted-foreground">
            typologie la plus fréquente
          </p>
        </CardContent>
      </Card>
    </div>
  );
}