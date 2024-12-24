import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, MapPin, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const PaymentHistory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: payments, isLoading, error } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          *,
          property:properties(*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger l'historique des paiements",
          variant: "destructive",
        });
        throw error;
      }
      
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        Une erreur est survenue lors du chargement de l'historique
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Référence</TableHead>
            <TableHead>Parcelle</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments?.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>
                {new Date(payment.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>{payment.id}</TableCell>
              <TableCell>{payment.property?.title}</TableCell>
              <TableCell>{payment.amount} MAD</TableCell>
              <TableCell>
                <Badge 
                  variant={payment.status === 'completed' ? "success" : "secondary"}
                >
                  {payment.status === 'completed' ? 'Payé' : 'En cours'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {payment.status === 'completed' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/receipt/${payment.id}`)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Reçu
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/map?parcel=${payment.property_id}`)}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Voir sur la carte
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {payments?.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Aucun paiement trouvé
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};