import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export const ParcelList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: parcels, isLoading, error } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*');
      
      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les parcelles",
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
        Une erreur est survenue lors du chargement des parcelles
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID Parcelle</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Superficie</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Statut Fiscal</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parcels?.map((parcel) => (
            <TableRow key={parcel.id}>
              <TableCell>{parcel.id}</TableCell>
              <TableCell>{(parcel.location as { address: string }).address}</TableCell>
              <TableCell>{parcel.surface_area} m²</TableCell>
              <TableCell>{parcel.property_type}</TableCell>
              <TableCell>
                <Badge 
                  variant={parcel.fiscal_status === 'compliant' ? "success" : "destructive"}
                >
                  {parcel.fiscal_status === 'compliant' ? 'Payé' : 'Impayé'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/map?parcel=${parcel.id}`)}
                  >
                    Voir sur la carte
                  </Button>
                  {parcel.fiscal_status !== 'compliant' && (
                    <Button 
                      size="sm"
                      onClick={() => navigate(`/payment/${parcel.id}`)}
                    >
                      Payer
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
          {parcels?.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Aucune parcelle trouvée
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};