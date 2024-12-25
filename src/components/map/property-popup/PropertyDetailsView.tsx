import { Parcel } from "@/utils/mockData/types";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/format";
import { Lock, EyeOff, User, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface PropertyDetailsViewProps {
  parcel: Parcel;
}

export function PropertyDetailsView({ parcel }: PropertyDetailsViewProps) {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      AVAILABLE: { label: "Disponible", class: "bg-green-500/10 text-green-500" },
      SOLD: { label: "Vendu", class: "bg-red-500/10 text-red-500" },
      IN_TRANSACTION: { label: "En Transaction", class: "bg-orange-500/10 text-orange-500" },
    } as const;

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.AVAILABLE;
    return <Badge variant="secondary" className={config.class}>{config.label}</Badge>;
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const formatTitleDeedNumber = (number: string) => {
    if (!profile) {
      return number.replace(/./g, '•');
    }
    return number;
  };

  return (
    <Card className="p-6 max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Détails du Bien</h2>
            <p className="text-muted-foreground">
              Dernière mise à jour : {new Date().toLocaleDateString()}
            </p>
          </div>
          {getStatusBadge(parcel.status)}
        </div>

        {/* Informations principales */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Titre Foncier</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{formatTitleDeedNumber(parcel.titleDeedNumber)}</span>
                {!profile && <Lock className="h-4 w-4 text-muted-foreground" />}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Propriétaire</span>
              <div className="flex items-center gap-2">
                {profile ? (
                  <span className="font-medium">{parcel.ownerName}</span>
                ) : (
                  <>
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">••••••</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Superficie</span>
              <span className="font-medium">{parcel.surface} m²</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Prix TNB</span>
              <span className="font-medium">{formatCurrency(parcel.tnbInfo.pricePerMeter)} DHS/m²</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Localisation</span>
              <span className="font-medium">{parcel.address}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Type</span>
              <span className="font-medium">{parcel.type}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Zone</span>
              <span className="font-medium">{parcel.zone}</span>
            </div>
          </div>
        </div>

        {/* Documents (floutés pour les visiteurs) */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Documents disponibles</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {['Note de Renseignement', 'Plan Cadastral', 'Certificat de Propriété'].map((doc) => (
              <Card key={doc} className="p-4 relative">
                <div className={`space-y-2 ${!profile ? 'blur-sm' : ''}`}>
                  <h4 className="font-medium">{doc}</h4>
                  <p className="text-sm text-muted-foreground">PDF - 2.3 MB</p>
                </div>
                {!profile && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                    <Lock className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* CTA pour les visiteurs */}
        {!profile && (
          <div className="bg-primary/5 p-6 rounded-lg space-y-4">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">
                Débloquez l'accès complet aux informations
              </h3>
              <p className="text-muted-foreground">
                Inscrivez-vous en tant que promoteur pour accéder à toutes les informations et documents
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleRegisterClick} className="gap-2">
                <UserPlus className="h-4 w-4" />
                Créer un compte promoteur
              </Button>
              <Button variant="outline" onClick={handleLoginClick} className="gap-2">
                <User className="h-4 w-4" />
                Se connecter
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}