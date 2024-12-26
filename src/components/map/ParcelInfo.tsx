import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/utils/format";
import { MapPin, User, Ruler, CreditCard, FileText, Building, X, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { Parcel } from '@/utils/mockData/types';
import { UserRole } from '@/types/auth';
import { useMediaQuery } from "@/hooks/use-media-query";
import { ParcelStatusBadges } from "./parcel-info/ParcelStatusBadges";
import { BlurredField } from "./parcel-info/BlurredField";
import { cn } from "@/lib/utils";

export interface ParcelInfoProps {
  parcel: Parcel;
  onClose: () => void;
  className?: string;
  userRole?: UserRole;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export const ParcelInfo = ({ 
  parcel, 
  onClose, 
  className, 
  userRole,
  isExpanded,
  onToggleExpand 
}: ParcelInfoProps) => {
  const { profile } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const isAuthenticated = !!profile;
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleLoginClick = () => {
    setLoginOpen(true);
  };

  return (
    <>
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
      <Card className={cn(
        "overflow-hidden animate-in fade-in-0 zoom-in-95",
        "transition-all duration-200 ease-in-out",
        isExpanded ? "scale-100" : "scale-95",
        className
      )}>
        <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Détails du Bien {parcel.titleDeedNumber}
          </h3>
          <div className="flex items-center gap-2">
            {onToggleExpand && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleExpand}
                className="hover:bg-primary-foreground/20 text-primary-foreground"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-primary-foreground/20 text-primary-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className={cn(
          "transition-all duration-200",
          isMobile ? 'max-h-[70vh]' : isExpanded ? 'max-h-[600px]' : 'max-h-[400px]',
          "px-6 py-4"
        )}>
          <div className="space-y-6">
            <div className="space-y-2">
              <ParcelStatusBadges 
                status={parcel.status}
                taxStatus={parcel.taxStatus}
                fiscalStatus={parcel.fiscalStatus}
              />
            </div>

            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <BlurredField value={parcel.address} className="text-sm" />
              </div>
              
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <BlurredField value={parcel.ownerName} className="text-sm" />
              </div>

              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{parcel.surface} m²</span>
              </div>

              {parcel.price && (
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-green-600">
                    Prix de vente: {formatCurrency(parcel.price)} DHS
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Statut Fiscal: {parcel.taxStatus}</span>
              </div>

              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Type: {parcel.type}</span>
              </div>
            </div>

            {!isAuthenticated && (
              <div className="pt-4 border-t">
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={handleLoginClick}
                >
                  🔍 Voir Plus de Détails
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Créez un compte pour accéder aux informations complètes du bien
                </p>
              </div>
            )}

            {isAuthenticated && (
              <div className="space-y-3 pt-4 border-t">
                {userRole === "owner" && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => console.log("Contact Owner")}
                  >
                    Contacter le Propriétaire
                  </Button>
                )}
                
                {userRole === "developer" && (
                  <Button 
                    variant="default"
                    className="w-full"
                    onClick={() => console.log("View Details")}
                  >
                    Voir les détails complets
                  </Button>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>
    </>
  );
};